
const SUPABASE_URL = 'https://wxzgdyjqzzyqeqwmwqzd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4emdkeWpxenp5cWVxd213cXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NjE0MjEsImV4cCI6MjA2ODMzNzQyMX0.N88CHQ-C99X4R88RfVCJ9OAWX1vNM0SRBkVUmz291qc';


const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", function () {

  const nutritionForm = document.getElementById("nutritionForm");
  const successMessage = document.getElementById("successMessage");
  
  setupFormValidation();


  nutritionForm.addEventListener("submit", handleFormSubmit);


  function setupFormValidation() {
    const requiredFields = nutritionForm.querySelectorAll("[required]");
    
    requiredFields.forEach(field => {
      const errorElement = document.createElement("span");
      errorElement.className = "error-message";
      errorElement.textContent = "هذا الحقل مطلوب";
      field.parentNode.appendChild(errorElement);
      
      // Add validation event listeners
      field.addEventListener("input", () => validateField(field));
      field.addEventListener("blur", () => validateField(field));
    });
  }

  /**
   * Validates a single form field
   * @param {HTMLElement} field - The form field to validate
   */
  function validateField(field) {
    const errorElement = field.parentNode.querySelector(".error-message");
    
    if (field.validity.valid) {
      errorElement.style.display = "none";
      field.classList.remove("invalid");
    } else {
      errorElement.style.display = "block";
      field.classList.add("invalid");
    }
  }

  /**
   * Handles form submission
   * @param {Event} e - The submit event
   */
  async function handleFormSubmit(e) {
    e.preventDefault();

    // Validate all required fields
    const isValid = validateAllFields();
    if (!isValid) return;

    // Show loading state
    const submitButton = nutritionForm.querySelector('.btn-submit');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    submitButton.disabled = true;

    try {
      // Collect and save form data
      const formData = collectFormData();
      await saveClientDataToSupabase(formData);

      // Show success and reset form
      showSuccessMessage();
      nutritionForm.reset();
    } catch (error) {
      console.error("Error saving data:", error);
      showErrorMessage("حدث خطأ في حفظ البيانات، الرجاء المحاولة مرة أخرى");
    } finally {
      // Reset button state
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  }

  /**
   * Validates all required form fields
   * @returns {boolean} True if all fields are valid
   */
  function validateAllFields() {
    let isValid = true;
    const requiredFields = nutritionForm.querySelectorAll("[required]");
    
    requiredFields.forEach(field => {
      validateField(field);
      if (!field.validity.valid) {
        isValid = false;
      }
    });

    return isValid;
  }

  /**
   * Collects form data into an object
   * @returns {Object} The collected form data
   */
  function collectFormData() {
    return {
      name: nutritionForm.elements["name"].value.trim(),
      age: parseInt(nutritionForm.elements["age"].value),
      weight: parseFloat(nutritionForm.elements["weight"].value),
      height: parseInt(nutritionForm.elements["height"].value),
      exercise: nutritionForm.elements["exercise"].value,
      sleep: nutritionForm.elements["sleep"].value.trim() || null,
      work_nature: nutritionForm.elements["work_nature"].value.trim() || null,
      water_intake: nutritionForm.elements["water_intake"].value.trim() || null,
      diseases: nutritionForm.elements["diseases"].value.trim() || null,
      daily_food: nutritionForm.elements["dailyFood"].value.trim() || null,
      favorite_foods: nutritionForm.elements["favorite_foods"].value.trim() || null,
      goal: nutritionForm.elements["goal"].value
    };
  }

  /**
   * Saves client data to Supabase
   * @param {Object} client - The client data to save
   */
  async function saveClientDataToSupabase(client) {
    const { data, error } = await supabase
      .from('nutrition_clients')
      .insert([client])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(error.message);
    }

    console.log("Data saved successfully:", data);
    return data;
  }

  /**
   * Displays success message
   */
  function showSuccessMessage() {
    successMessage.style.display = "block";
    successMessage.innerHTML = '<i class="fas fa-check-circle" aria-hidden="true"></i> تم حفظ البيانات بنجاح';
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 5000);
  }

  /**
   * Displays error message
   * @param {string} message - The error message to display
   */
  function showErrorMessage(message) {
    successMessage.style.display = "block";
    successMessage.innerHTML = `<i class="fas fa-exclamation-circle" aria-hidden="true"></i> ${message}`;
    successMessage.classList.add("error");
    setTimeout(() => {
      successMessage.style.display = "none";
      successMessage.classList.remove("error");
    }, 5000);
  }
});