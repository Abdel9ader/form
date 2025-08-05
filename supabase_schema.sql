
CREATE TABLE nutrition_clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 10 AND age <= 100),
  weight DECIMAL(5,2) NOT NULL,
  height INTEGER NOT NULL,
  exercise VARCHAR(50) NOT NULL,
  sleep TEXT,
  work_nature TEXT,
  water_intake TEXT,
  diseases TEXT,
  daily_food TEXT,
  favorite_foods TEXT,
  goal VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_nutrition_clients_created_at ON nutrition_clients(created_at);
CREATE INDEX idx_nutrition_clients_name ON nutrition_clients(name);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_nutrition_clients_updated_at 
    BEFORE UPDATE ON nutrition_clients 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE nutrition_clients ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Enable read access for all users" ON nutrition_clients
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON nutrition_clients
    FOR INSERT WITH CHECK (true);

COMMENT ON TABLE nutrition_clients IS 'جدول بيانات العملاء لاستمارة التغذية';
COMMENT ON COLUMN nutrition_clients.name IS 'اسم العميل';
COMMENT ON COLUMN nutrition_clients.age IS 'عمر العميل';
COMMENT ON COLUMN nutrition_clients.weight IS 'الوزن بالكيلوجرام';
COMMENT ON COLUMN nutrition_clients.height IS 'الطول بالسنتيمتر';
COMMENT ON COLUMN nutrition_clients.exercise IS 'ممارسة الرياضة';
COMMENT ON COLUMN nutrition_clients.sleep IS 'نظام النوم';
COMMENT ON COLUMN nutrition_clients.work_nature IS 'طبيعة العمل';
COMMENT ON COLUMN nutrition_clients.water_intake IS 'معدل شرب الماء';
COMMENT ON COLUMN nutrition_clients.diseases IS 'الأمراض والحالات الصحية';
COMMENT ON COLUMN nutrition_clients.daily_food IS 'نظام الأكل اليومي';
COMMENT ON COLUMN nutrition_clients.favorite_foods IS 'الأطعمة المفضلة';
COMMENT ON COLUMN nutrition_clients.goal IS 'الهدف من الاستشارة'; 