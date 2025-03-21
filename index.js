document.addEventListener("DOMContentLoaded", () => {
    // the new custom select 
    const schemeSelect = document.getElementById('color-scheme');
    const selected = schemeSelect.querySelector('.scheme-select-selected');
    const optionsContainer = schemeSelect.querySelector('.scheme-select-options');
    const options = schemeSelect.querySelectorAll('.scheme-option');
    const hiddenInput = document.getElementById('color-scheme-input');

    // Toggle dropdown
    schemeSelect.addEventListener('click', () => {
        optionsContainer.style.display = optionsContainer.style.display === 'block' ? 'none' : 'block';
    });

    // Handle option click
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selected.textContent = option.textContent;
            hiddenInput.value = option.dataset.value;
            optionsContainer.style.display = 'none';
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!schemeSelect.contains(e.target)) {
            optionsContainer.style.display = 'none';
        }
    });

})