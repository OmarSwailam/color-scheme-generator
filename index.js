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


    // generate schema
    const BASE_URL = "https://www.thecolorapi.com"
    const ENDPOINT = "/scheme"

    const colorsContainers = document.querySelectorAll("#color-container")

    const form = document.getElementById("generate-form")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const formData = new FormData(form);
        const hex = formData.get("hex").slice(1)
        const mode = formData.get("mode")
        fetch(`${BASE_URL}${ENDPOINT}?hex=${hex}&mode=${mode}&count=5`)
            .then(response => response.json())
            .then(data => {
                const colorsArray = data.colors.map(colorObj => colorObj.hex.value)
                colorsContainers.forEach((container, index) => {
                    const colorDisplay = container.children[0]
                    const colorCode = container.children[1]
                    colorDisplay.style.backgroundColor = colorsArray[index]
                    colorCode.innerText = colorsArray[index]
                })
            })
    })
})