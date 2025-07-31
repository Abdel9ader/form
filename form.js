document.addEventListener("DOMContentLoaded", function () {
  const nutritionForm = document.getElementById("nutritionForm");
  const successMessage = document.getElementById("successMessage");

  nutritionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // جمع بيانات النموذج
    const formData = {
      name: this.elements["name"].value.trim(),
      age: this.elements["age"].value,
      weight: this.elements["weight"].value,
      height: this.elements["height"].value,
      exercise: this.elements["exercise"].value,
      diseases: this.elements["diseases"].value.trim(),
      dailyFood: this.elements["dailyFood"].value.trim(),
      sleep: this.elements["sleep"].value.trim(),
      goal: this.elements["goal"].value,
      timestamp: new Date().toLocaleString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // التحقق من البيانات المطلوبة
    if (
      !formData.name ||
      !formData.age ||
      !formData.weight ||
      !formData.height ||
      !formData.goal
    ) {
      alert("الرجاء تعبئة جميع الحقول المطلوبة");
      return;
    }

    // حفظ البيانات
    saveClientData(formData);

    // عرض رسالة النجاح
    showSuccessMessage();

    // إعادة تعيين النموذج
    this.reset();
  });

  function saveClientData(client) {
    try {
      const clients =
        JSON.parse(localStorage.getItem("nutritionClients")) || [];
      clients.push(client);
      localStorage.setItem("nutritionClients", JSON.stringify(clients));
    } catch (error) {
      console.error("حدث خطأ في حفظ البيانات:", error);
      alert("حدث خطأ في حفظ البيانات، الرجاء المحاولة مرة أخرى");
    }
  }

  function showSuccessMessage() {
    successMessage.style.display = "block";
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 3000);
  }
});
