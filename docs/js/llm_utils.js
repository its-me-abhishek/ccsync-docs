document.addEventListener("DOMContentLoaded", function() {
    
    const COPY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>`;
    const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;


    function getPageContent() {
        const article = document.querySelector('.md-content__inner');
        return article ? article.innerText : "";
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        Object.assign(toast.style, {
            position: 'fixed', bottom: '20px', right: '20px',
            background: 'var(--md-default-fg-color--light)', color: 'var(--md-default-bg-color)', 
            padding: '12px 24px', borderRadius: '4px', zIndex: '10000', 
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)', opacity: '0', transition: 'opacity 0.3s',
            fontWeight: 'bold'
        });
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.style.opacity = '1');
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    const btn = document.createElement('button');
    btn.className = 'md-header__button llm-copy-btn';
    btn.title = "Copy page text";
    
    Object.assign(btn.style, {
        display: 'flex', alignItems: 'center', gap: '8px',
        cursor: 'pointer', border: '1px solid white',
        borderRadius: '24px', padding: '6px 16px', margin: '0 8px',
        backgroundColor: 'transparent', color: 'white',
        fontSize: '0.8rem', fontWeight: '500', transition: 'all 0.2s ease',
        height: '36px' 
    });

    const iconSpan = document.createElement('span');
    iconSpan.style.cssText = "width: 18px; display: flex; align-items: center;";
    iconSpan.innerHTML = COPY_ICON;
    
    const textSpan = document.createElement('span');
    textSpan.innerText = "Copy page";

    btn.appendChild(iconSpan);
    btn.appendChild(textSpan);

    btn.onmouseenter = () => btn.style.backgroundColor = 'var(--md-default-bg-color--lighter)';
    btn.onmouseleave = () => btn.style.backgroundColor = 'transparent';

    btn.addEventListener('click', () => {
        const text = "Here is the documentation context:\n\n" + getPageContent();
        
        navigator.clipboard.writeText(text).then(() => {
            showToast("Page content copied!");
          
            iconSpan.innerHTML = CHECK_ICON;
            textSpan.innerText = "Copied!";
            btn.style.borderColor = 'var(--md-accent-fg-color)';
            btn.style.color = 'var(--md-accent-fg-color)';
            
            setTimeout(() => {
                iconSpan.innerHTML = COPY_ICON;
                textSpan.innerText = "Copy page";
                btn.style.borderColor = 'var(--md-default-fg-color--lightest)';
                btn.style.color = 'white';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            showToast("Failed to copy text.");
        });
    });


    const attachToHeader = () => {
        const headerInner = document.querySelector('.md-header__inner');
        if (headerInner) {
            headerInner.appendChild(btn);
        } else {
            setTimeout(attachToHeader, 100);
        }
    };

    attachToHeader();
});