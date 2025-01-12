document.addEventListener('DOMContentLoaded', () => {
    const addMoreFieldsBtn = document.getElementById('add-more-fields');
    const dynamicFieldsContainer = document.getElementById('dynamic-fields-container');
    let fieldCount = 1; 
    addMoreFieldsBtn.addEventListener('click', () => {
        fieldCount++; 

        const newFieldGroup = document.createElement('div');
        newFieldGroup.classList.add('field-group');

        const newLabelField = document.createElement('input');
        newLabelField.type = 'text';
        newLabelField.name = `label${fieldCount}`;
        newLabelField.placeholder = `Enter label ${fieldCount}`;
        newLabelField.required = true;

        const newValueField = document.createElement('input');
        newValueField.type = 'text';
        newValueField.name = `value${fieldCount}`;
        newValueField.placeholder = `Enter value ${fieldCount}`;
        newValueField.required = true;

        newFieldGroup.appendChild(newLabelField);
        newFieldGroup.appendChild(newValueField);

        dynamicFieldsContainer.appendChild(newFieldGroup);
    });
});
function toggleAccordion(id) {
    const content = document.getElementById(`accordion-content-${id}`);
    if (content) {
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    }
}
//side-bar sroll active button
window.addEventListener('scroll', () => {
    let sections = document.querySelectorAll('div[id]');
    let navLinks = document.querySelectorAll('.nav a');
    let currentSection = '';

    sections.forEach((section) => {
        let sectionTop = section.offsetTop;
        let sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3 && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
//Date format
document.addEventListener('DOMContentLoaded', () => {
   
    const monthElement = document.querySelector('.select-month');

    if (monthElement) {
        const rawMonth = monthElement.getAttribute('data-month'); 
        console.log('Raw month:', rawMonth); 
        if (rawMonth) {
            function formatMonth(monthString) {
                const [year, month] = monthString.split('-');
                const date = new Date(year, month - 1); 
                return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
            }

            monthElement.textContent = `For ${formatMonth(rawMonth)}`;
        } else {
            console.error('data-month attribute is missing or empty.');
        }
    } else {
        console.error('Element with class "select-month" not found.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('select-month');
    if (select) {
       
        [...select.options].forEach(option => {
            const rawMonth = option.value; 
            const [year, month] = rawMonth.split('-');
            const date = new Date(year, month - 1); 
            let formattedMonth = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });

            formattedMonth = formattedMonth.replace(/([a-zA-Z]+)( \d{4})/, "$1' $2");

            option.textContent = formattedMonth; 
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const expenseDateElement = document.querySelector('.expense-p2');

    if (expenseDateElement) {
        const rawDate = expenseDateElement.getAttribute('data-date');

        if (rawDate) {
            const date = new Date(rawDate); 
            const formattedDate = date.toLocaleDateString('en-US', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
            });

            expenseDateElement.textContent = `Date: ${formattedDate}`;
        } else {
            console.error('Date is missing or invalid.');
        }
    }
});


