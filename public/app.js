document.querySelectorAll('.price').forEach(node => {
    node.textContent = Intl.NumberFormat('ru-Ru', {
        currency: 'rub',
        style: 'currency'
    }).format(node.textContent);
})