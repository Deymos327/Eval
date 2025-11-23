if (navigator.userAgent.match(/(iPad|iPhone|iPod|Android|Silk)/gi))
{
    document.write("<link rel=\"stylesheet\" href=\"fixparallax.css\" />");
}

function smoothScroll(target) 
{
    const element = document.querySelector(target);        
    if (element) 
    {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset;
        const headerHeight = document.querySelector('nav').offsetHeight;
                
        window.scrollTo(
            {
                top: offsetPosition - headerHeight,
                behavior: 'smooth'
            }
        );
    }
}
        
document.addEventListener('DOMContentLoaded', function() 
{
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => 
        {
            link.addEventListener('click', 
                function(e) 
                {
                    e.preventDefault();
                    const target = this.getAttribute('href');
                    smoothScroll(target);

                    if (target !== '#') 
                        {
                            history.pushState(null, null, target);
                        }
                    
                }
            );
        });
    });
    
if (!('scrollBehavior' in document.documentElement.style)) 
{
    const smoothScrollPolyfill = function() 
    {
        const start = window.pageYOffset;
        const target = arguments[0].top - document.querySelector('nav').offsetHeight;
        const distance = target - start;
        const duration = 800;
        let startTime = null;
        
        function animation(currentTime) 
        {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, start, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) 
        {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        requestAnimationFrame(animation);
    };
    
    window.scrollTo = function() 
    {
        if (arguments[0].behavior === 'smooth') 
            {
                smoothScrollPolyfill.apply(this, arguments);
            }
            else
            {
                window.scrollTo.apply(this, arguments);
            }
    };
}

function openMaps(event, address, lat, lng) 
{
    event.preventDefault();
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    if (isIOS) 
        {
            const googleMapsAppUrl = `comgooglemaps://?q=${lat},${lng}&center=${lat},${lng}&zoom=15`;
            window.location.href = googleMapsAppUrl;
            setTimeout(() => 
                {
                    window.location.href = `maps://?q=${encodeURIComponent(address)}&ll=${lat},${lng}`;
                }, 300);
    } 
    else
        if (isAndroid) 
            {
                window.location.href = `geo:${lat},${lng}?q=${encodeURIComponent(address)}`;
            } 
            else 
                {
                    window.open(`https://yandex.by/maps/org/eval/52623739810/?ll=${lng}%2C${lat}&mode=search&text=${encodeURIComponent(address)}&z=15`, '_blank');
                }
}

if (navigator.userAgent.match(/(iPad|iPhone|iPod|Android|Silk)/gi)) 
    {
        document.write("<link rel=\"stylesheet\" href=\"fixparallax.css\" />");
    }