document.addEventListener('DOMContentLoaded', () => {
    const trackingInput = document.getElementById('tracking-number-input');
    const trackButton = document.getElementById('track-button');
    const companyNameDiv = document.getElementById('company-name');

    // Kargo formatı kontrol fonksiyonu
    function getCargoCompany(trackingNumber) {
        trackingNumber = trackingNumber.trim().toUpperCase();

        // Aras Kargo: Genellikle 12 haneli sayılar veya harf ve sayı kombinasyonları
        if (/^\d{12}$/.test(trackingNumber) || /^[A-Z0-9]{12}$/.test(trackingNumber)) {
            return 'Aras Kargo';
        }
        
        // Trendyol Express: Genellikle 12 haneli sayı
        if (/^\d{12}$/.test(trackingNumber)) {
             return 'Trendyol Express';
        }

        // MNG Kargo: Genellikle 8, 12, 14 haneli sayılar
        if (/^\d{8}$/.test(trackingNumber) || /^\d{12}$/.test(trackingNumber) || /^\d{14}$/.test(trackingNumber)) {
            return 'MNG Kargo';
        }

        // Yurtiçi Kargo: Genellikle 10 haneli sayılar
        if (/^\d{10}$/.test(trackingNumber)) {
            return 'Yurtiçi Kargo';
        }

        // Sürat Kargo: Genellikle 11 haneli sayılar
        if (/^\d{11}$/.test(trackingNumber)) {
            return 'Sürat Kargo';
        }

        // Hepsijet: Genellikle 14 haneli sayılar veya harf ve sayı kombinasyonları
        if (/^\d{14}$/.test(trackingNumber) || /^[A-Z0-9]{14}$/.test(trackingNumber)) {
            return 'Hepsijet';
        }
        
        // Diğer firmalar için daha fazla kural eklenebilir.
        return 'Bilinmiyor';
    }

    trackButton.addEventListener('click', () => {
        const trackingNumber = trackingInput.value;
        if (trackingNumber) {
            const company = getCargoCompany(trackingNumber);
            companyNameDiv.textContent = `Bu kargo muhtemelen: ${company}`;
            companyNameDiv.style.color = (company === 'Bilinmiyor') ? 'red' : 'green';
        } else {
            companyNameDiv.textContent = 'Lütfen bir takip numarası girin.';
            companyNameDiv.style.color = 'red';
        }
    });

    // Enter tuşuyla arama yapma
    trackingInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            trackButton.click();
        }
    });
});
