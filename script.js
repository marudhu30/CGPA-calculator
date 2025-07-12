function generateSubjectInputs() {
  const count = parseInt(document.getElementById('subjectCount').value);
  const container = document.getElementById('subjectsContainer');
  container.innerHTML = ''; // Clear previous subjects

  if (isNaN(count) || count <= 0) {
    alert("Please enter a valid number of subjects.");
    return;
  }

  for (let i = 1; i <= count; i++) {
    const subjectDiv = document.createElement('div');
    subjectDiv.className = 'bg-gray-800 p-4 rounded shadow';

    subjectDiv.innerHTML = `
      <h2 class="text-lg font-semibold mb-2">Subject #${i}</h2>
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <label class="block mb-1 text-sm">Grade</label>
          <select class="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white">
            <option value="10">O (10)</option>
            <option value="9">A+ (9)</option>
            <option value="8">A (8)</option>
            <option value="7">B+ (7)</option>
            <option value="6">B (6)</option>
            <option value="5">C (5)</option>
            <option value="0">U / CS (0)</option>
          </select>
        </div>
        <div class="flex-1">
          <label class="block mb-1 text-sm">Credit</label>
          <select class="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white">
            <option value="1">1.0</option>
            <option value="2">2.0</option>
            <option value="3">3.0</option>
            <option value="4">4.0</option>
          </select>
        </div>
      </div>
    `;

    container.appendChild(subjectDiv);
  }

  document.getElementById('calculateSection').classList.remove('hidden');
  document.getElementById('result').textContent = '';
}

function calculateCGPA() {
  let totalPoints = 0;
  let totalCredits = 0;

  const subjectDivs = document.querySelectorAll('#subjectsContainer > div');

  subjectDivs.forEach(subject => {
    const selects = subject.querySelectorAll('select');
    const grade = parseFloat(selects[0].value);
    const credit = parseFloat(selects[1].value);

    if (!isNaN(grade) && !isNaN(credit)) {
      totalPoints += grade * credit;
      totalCredits += credit;
    }
  });

  const resultDiv = document.getElementById('result');

  if (totalCredits === 0) {
    resultDiv.textContent = "Please enter valid grades and credits.";
    return;
  }

  const cgpa = (totalPoints / totalCredits).toFixed(2);
  resultDiv.textContent = `🎓 Your CGPA is: ${cgpa}`;
}
