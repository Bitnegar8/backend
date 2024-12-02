const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// اسکیمای Property
const propertySchema = new Schema({
  // فیلدهای رفرنس
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    description: {
      en: "The ID of the company to which the property belongs.",
      ar: "معرف الشركة التي تنتمي إليها العقار.",
    },
    // شناسه کمپانی که این پراپرتی به آن تعلق دارد
  },
  view: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "View",
    description: {
      en: "The ID of the view type associated with the property.",
      ar: "معرف نوع العرض المرتبط بالعقار.",
    },
    // شناسه نمای خاص که به پراپرتی تعلق دارد
  },
  areaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Area",
    description: {
      en: "The ID of the area where the property is located.",
      ar: "معرف المنطقة التي يقع فيها العقار.",
    },
    // شناسه منطقه ای که پراپرتی در آن قرار دارد
  },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
    description: {
      en: "The ID of the country where the property is located.",
      ar: "معرف الدولة التي يقع فيها العقار.",
    },
    // شناسه کشور پراپرتی
  },
  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    description: {
      en: "The ID of the state or province where the property is located.",
      ar: "معرف الولاية أو المقاطعة التي يقع فيها العقار.",
    },
    // شناسه ایالت یا استان پراپرتی
  },
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    description: {
      en: "The ID of the city where the property is located.",
      ar: "معرف المدينة التي يقع فيها العقار.",
    },
    // شناسه شهری که پراپرتی در آن قرار دارد
  },
  propertyTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PropertyType",
    description: {
      en: "The ID of the type of the property (apartment, villa, etc.).",
      ar: "معرف نوع العقار (شقة، فيلا، إلخ).",
    },
    // شناسه نوع پراپرتی (مثلا آپارتمان، ویلا و غیره)
  },
  furnishStatusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FurnishStatus",
    description: {
      en: "The ID representing the furnishing status of the property.",
      ar: "معرف حالة التأثيث للعقار.",
    },
    // شناسه وضعیت مبلمان پراپرتی
  },
  completionStatusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompletionStatus",
    description: {
      en: "The ID of the completion status of the property.",
      ar: "معرف حالة إتمام العقار.",
    },
    // شناسه وضعیت تکمیل ساخت پراپرتی
  },

  // فیلدهای دیگر
  fullName: {
    type: String,
    description: {
      en: "Full name of the property.",
      ar: "الاسم الكامل للعقار.",
    },
    // نام کامل پراپرتی
  },
  developerName: {
    type: String,
    description: {
      en: "Name of the developer or company that built the property.",
      ar: "اسم المطور أو الشركة التي بنيت العقار.",
    },
    // نام توسعه‌دهنده یا شرکت سازنده پراپرتی
  },
  projectName: {
    type: String,
    description: {
      en: "Name of the project that the property is part of.",
      ar: "اسم المشروع الذي ينتمي إليه العقار.",
    },
    // نام پروژه که پراپرتی جزئی از آن است
  },
  totalPrice: {
    type: Number,
    description: {
      en: "Total price of the property.",
      ar: "السعر الكلي للعقار.",
    },
    // قیمت کل پراپرتی
  },
  handOverTime: {
    type: Date,
    description: {
      en: "The expected handover time for the property.",
      ar: "الوقت المتوقع لتسليم العقار.",
    },
    // زمان تحویل پراپرتی
  },
  unitType: {
    type: String,
    description: {
      en: "Type of unit (apartment, house, office, etc.).",
      ar: "نوع الوحدة (شقة، منزل، مكتب، إلخ).",
    },
    // نوع واحد (مثلا آپارتمان، خانه، دفتر و غیره)
  },

  // امکانات (یک آرایه از رشته‌ها)
  amenities: {
    type: [String],
    description: {
      en: "List of amenities available in the property (e.g., pool, parking).",
      ar: "قائمة المرافق المتاحة في العقار (مثل المسبح، موقف السيارات).",
    },
    // لیست امکانات موجود در پراپرتی (مثلا استخر، پارکینگ و غیره)
  },

  // برنامه پرداخت
  paymentPlan: {
    type: String,
    description: {
      en: "Description of the payment plan (monthly, yearly, etc.).",
      ar: "وصف خطة الدفع (شهري، سنوي، إلخ).",
    },
    // توضیحات درباره برنامه پرداخت (ماهانه، سالانه و غیره)
  },
  furnishStatusText: {
    type: String,
    description: {
      en: "Text description of the furnish status (furnished, unfurnished, etc.).",
      ar: "وصف نصي لحالة التأثيث (مؤثث، غير مؤثث، إلخ).",
    },
    // توضیح وضعیت مبلمان پراپرتی (مبله، نوساز و غیره)
  },
  listingId: {
    type: String,
    description: {
      en: "Unique identifier for the listing of the property.",
      ar: "المعرف الفريد لقائمة العقار.",
    },
    // شناسه لیستینگ پراپرتی در سایت یا پلتفرم
  },
  propertyId: {
    type: String,
    description: {
      en: "Unique property identifier.",
      ar: "المعرف الفريد للعقار.",
    },
    // شناسه منحصر به فرد پراپرتی
  },
  listingTitle: {
    type: String,
    description: {
      en: "Title of the property listing.",
      ar: "عنوان قائمة العقار.",
    },
    // عنوان لیستینگ پراپرتی
  },
  rentAmount: {
    type: Number,
    description: {
      en: "Monthly rent amount for the property.",
      ar: "مبلغ الإيجار الشهري للعقار.",
    },
    // مبلغ اجاره ماهانه
  },
  numberOfBathRooms: {
    type: Number,
    description: {
      en: "Number of bathrooms in the property.",
      ar: "عدد الحمامات في العقار.",
    },
    // تعداد حمام‌ها در پراپرتی
  },
  listingType: {
    type: String,
    description: {
      en: "Type of listing (for sale, for rent, etc.).",
      ar: "نوع القائمة (للبيع، للإيجار، إلخ).",
    },
    // نوع لیستینگ (برای فروش، اجاره و غیره)
  },
  contactMobile: {
    type: String,
    description: {
      en: "Contact mobile number for the property.",
      ar: "رقم الهاتف المحمول للتواصل حول العقار.",
    },
    // شماره موبایل برای تماس درباره پراپرتی
  },
  contactEmail: {
    type: String,
    description: {
      en: "Contact email for the property.",
      ar: "البريد الإلكتروني للتواصل حول العقار.",
    },
    // ایمیل برای تماس درباره پراپرتی
  },
  contractTenure: {
    type: String,
    description: {
      en: "Duration of the rental contract.",
      ar: "مدة عقد الإيجار.",
    },
    // مدت زمان قرارداد اجاره
  },
  contractTenureText: {
    type: String,
    description: {
      en: "Textual description of the rental contract duration.",
      ar: "وصف نصي لمدة عقد الإيجار.",
    },
    // توضیحات مربوط به مدت زمان قرارداد
  },
  listingStatus: {
    type: String,
    description: {
      en: "Status of the listing (active, inactive, under review, etc.).",
      ar: "حالة القائمة (نشطة، غير نشطة، قيد المراجعة، إلخ).",
    },
    // وضعیت لیستینگ (فعال، غیرفعال، در حال بررسی و غیره)
  },

  // مکان و تاریخ‌ها
  location: {
    type: String,
    description: {
      en: "Location of the property.",
      ar: "موقع العقار.",
    },
    // موقعیت جغرافیایی پراپرتی
  },
  availableFrom: {
    type: Date,
    description: {
      en: "Date when the property is available for move-in or rent.",
      ar: "التاريخ الذي يصبح فيه العقار متاحًا للانتقال أو الإيجار.",
    },
    // تاریخ دسترسی پراپرتی برای اجاره یا اسکان
  },
  availabilityStatus: {
    type: Boolean,
    description: {
      en: "Availability status of the property (available or not).",
      ar: "حالة توافر العقار (متاح أو غير متاح).",
    },
    // وضعیت دسترسی پراپرتی (موجود یا غیر موجود)
  },

  createdAt: {
    type: Date,
    default: Date.now,
    description: {
      en: "The date when the property was created.",
      ar: "تاريخ إنشاء العقار.",
    },
    // تاریخ ایجاد پراپرتی
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    description: {
      en: "The date when the property was last updated.",
      ar: "تاريخ آخر تحديث للعقار.",
    },
    // تاریخ آخرین بروزرسانی پراپرتی
  },
});

module.exports = mongoose.model("Property", propertySchema);
