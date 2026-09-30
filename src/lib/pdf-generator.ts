import { jsPDF } from 'jspdf';
import { DietPlanResult } from '@/types';
import { GYM_DETAILS } from './constants';

export function generateDietPdf(plan: DietPlanResult): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;

  // Header Background Banner (Rich Onyx / Dark Gold)
  doc.setFillColor(15, 15, 18);
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Gold accent bar
  doc.setFillColor(212, 175, 55); // #d4af37
  doc.rect(0, 42, pageWidth, 2.5, 'F');

  // Gym Logo / Title
  doc.setTextColor(245, 158, 11);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('GYM HOLIC', margin, 16);

  doc.setTextColor(212, 175, 55);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('THE FITNESS CLUB • AMBIKAPUR', margin, 22);

  doc.setTextColor(220, 220, 225);
  doc.setFontSize(8.5);
  doc.text(`${GYM_DETAILS.address}, ${GYM_DETAILS.city} (C.G.)`, margin, 28);
  doc.text(`Phone: ${GYM_DETAILS.phone} | WhatsApp: +91 88188 75600`, margin, 34);

  // Badge on the right
  doc.setFillColor(28, 25, 23);
  doc.roundedRect(pageWidth - 62, 8, 48, 26, 3, 3, 'F');
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.5);
  doc.roundedRect(pageWidth - 62, 8, 48, 26, 3, 3, 'D');

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('AI PERSONALIZED', pageWidth - 58, 15);
  doc.text('FITNESS BLUEPRINT', pageWidth - 58, 20);
  doc.setTextColor(160, 160, 160);
  doc.setFontSize(7);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - 58, 26);
  doc.text('Official Member Copy', pageWidth - 58, 30);

  // Member Profile Card
  let currentY = 52;
  doc.setFillColor(248, 249, 250);
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 26, 3, 3, 'F');
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 26, 3, 3, 'D');

  doc.setTextColor(20, 20, 20);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Client: ${plan.name.toUpperCase()}`, margin + 5, currentY + 7);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(70, 70, 70);
  doc.text(
    `Age: ${plan.age} yrs | Gender: ${plan.gender.toUpperCase()} | Height: ${plan.heightCm} cm | Weight: ${plan.weightKg} kg`,
    margin + 5,
    currentY + 14
  );
  doc.text(
    `BMI: ${plan.bmi} (${plan.bmiCategory}) | Daily Target: ${plan.dailyCalories} kcal | Water: ${plan.waterIntakeLiters} L`,
    margin + 5,
    currentY + 20
  );

  // Macro Target Pills
  currentY += 32;
  doc.setTextColor(15, 15, 18);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('DAILY MACRONUTRIENT TARGETS', margin, currentY);

  currentY += 4;
  const colWidth = (pageWidth - margin * 2 - 6) / 3;

  // Protein Pill
  doc.setFillColor(254, 243, 199);
  doc.roundedRect(margin, currentY, colWidth, 14, 2, 2, 'F');
  doc.setTextColor(146, 64, 14);
  doc.setFontSize(9);
  doc.text('PROTEIN INTAKE', margin + 4, currentY + 5);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`${plan.macros.proteinGrams}g (${plan.macros.proteinGrams * 4} kcal)`, margin + 4, currentY + 11);

  // Carbs Pill
  doc.setFillColor(236, 253, 245);
  doc.roundedRect(margin + colWidth + 3, currentY, colWidth, 14, 2, 2, 'F');
  doc.setTextColor(6, 95, 70);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('CARBOHYDRATES', margin + colWidth + 7, currentY + 5);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`${plan.macros.carbsGrams}g (${plan.macros.carbsGrams * 4} kcal)`, margin + colWidth + 7, currentY + 11);

  // Fats Pill
  doc.setFillColor(238, 242, 255);
  doc.roundedRect(margin + (colWidth + 3) * 2, currentY, colWidth, 14, 2, 2, 'F');
  doc.setTextColor(55, 48, 163);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('HEALTHY FATS', margin + (colWidth + 3) * 2 + 4, currentY + 5);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`${plan.macros.fatsGrams}g (${plan.macros.fatsGrams * 9} kcal)`, margin + (colWidth + 3) * 2 + 4, currentY + 11);

  // Indian Meal Schedule
  currentY += 21;
  doc.setTextColor(15, 15, 18);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('INDIAN DAILY MEAL SCHEDULE', margin, currentY);

  currentY += 4;
  plan.meals.forEach((meal, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 250 : 255, idx % 2 === 0 ? 250 : 255, idx % 2 === 0 ? 250 : 255);
    doc.roundedRect(margin, currentY, pageWidth - margin * 2, 14, 1.5, 1.5, 'F');
    doc.setDrawColor(230, 230, 230);
    doc.roundedRect(margin, currentY, pageWidth - margin * 2, 14, 1.5, 1.5, 'D');

    doc.setTextColor(212, 140, 20);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.text(meal.timing, margin + 3, currentY + 4.5);

    doc.setTextColor(20, 20, 20);
    doc.setFont('helvetica', 'bold');
    doc.text(meal.name, margin + 68, currentY + 4.5);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const foodsStr = meal.foods.join('  •  ');
    doc.text(doc.splitTextToSize(foodsStr, pageWidth - margin * 2 - 10), margin + 3, currentY + 9.5);

    currentY += 15.5;
  });

  // Footer Offer Banner on Page 1
  currentY = pageHeight - 34;
  doc.setFillColor(15, 15, 18);
  doc.rect(0, currentY, pageWidth, 34, 'F');
  doc.setFillColor(212, 175, 55);
  doc.rect(0, currentY, pageWidth, 1.5, 'F');

  doc.setTextColor(251, 191, 36);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('SPECIAL GYM HOLIC MEMBERSHIP OFFER', margin, currentY + 8);

  doc.setTextColor(240, 240, 240);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Bring this printed PDF to Gym Holic, Above Bank of India, Ram Mandir Road, Ambikapur', margin, currentY + 14);
  doc.text(`Use Coupon Code: ${plan.couponCode} to claim an EXTRA 10% OFF on any Membership Plan!`, margin, currentY + 19);
  doc.text(`Call / WhatsApp us: ${GYM_DETAILS.phone} | Instagram: @gymholic_ambikapur`, margin, currentY + 24);

  // PAGE 2: Workout Plan & Supplement Recommendations
  doc.addPage();

  // Header Background Banner Page 2
  doc.setFillColor(15, 15, 18);
  doc.rect(0, 0, pageWidth, 28, 'F');
  doc.setFillColor(212, 175, 55);
  doc.rect(0, 28, pageWidth, 1.5, 'F');

  doc.setTextColor(245, 158, 11);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('GYM HOLIC • WORKOUT SCHEDULE & SUPPLEMENT STACK', margin, 14);

  doc.setTextColor(200, 200, 200);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Personalized Training Protocol for ${plan.name} (${plan.goal.replace('_', ' ').toUpperCase()})`, margin, 21);

  currentY = 38;
  doc.setTextColor(15, 15, 18);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('WEEKLY WORKOUT SPLIT', margin, currentY);

  currentY += 4;
  plan.workoutSplit.slice(0, 6).forEach((day) => {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, currentY, pageWidth - margin * 2, 22, 2, 2, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, currentY, pageWidth - margin * 2, 22, 2, 2, 'D');

    doc.setTextColor(180, 83, 9);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(day.day, margin + 4, currentY + 5.5);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(8.5);
    doc.text(day.focus, margin + 42, currentY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    const exerciseList = day.exercises.slice(0, 4).join('  |  ');
    doc.text(doc.splitTextToSize(exerciseList, pageWidth - margin * 2 - 8), margin + 4, currentY + 11);

    currentY += 24;
  });

  // Recommended Supplement Stack
  currentY += 4;
  doc.setTextColor(15, 15, 18);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('SCIENCE-BACKED SUPPLEMENT STACK', margin, currentY);

  currentY += 4;
  plan.supplements.forEach((supp) => {
    doc.setFillColor(254, 252, 232);
    doc.roundedRect(margin, currentY, pageWidth - margin * 2, 13, 1.5, 1.5, 'F');
    doc.setDrawColor(253, 230, 138);
    doc.roundedRect(margin, currentY, pageWidth - margin * 2, 13, 1.5, 1.5, 'D');

    doc.setTextColor(146, 64, 14);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.text(supp.name, margin + 3, currentY + 4.5);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text(`Dosage: ${supp.dosage}  •  Timing: ${supp.timing}`, margin + 3, currentY + 9);

    currentY += 15;
  });

  // Footer Page 2
  doc.setFillColor(15, 15, 18);
  doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');
  doc.setTextColor(212, 175, 55);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('GYM HOLIC, THE FITNESS CLUB', margin, pageHeight - 11);
  doc.setTextColor(200, 200, 200);
  doc.setFont('helvetica', 'normal');
  doc.text('Google Maps: https://maps.app.goo.gl/cyS5dvfGwdLuXo458 | Above Bank of India, Ambikapur', margin, pageHeight - 6);

  return doc;
}
