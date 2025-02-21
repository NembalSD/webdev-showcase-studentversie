class GDPR {

    constructor() {
        this.showStatus();
        this.showContent();
        this.bindEvents();

        if(this.cookieStatus() !== 'accept') this.showGDPR();
    }

    bindEvents() {
        let buttonAccept = document.querySelector('.gdpr-consent__button--accept');
        buttonAccept.addEventListener('click', () => {
            this.cookieStatus('accept');
            this.showStatus();
            this.showContent();
            this.hideGDPR();
        });


//student uitwerking
        let buttonDecline = document.querySelector('.gdpr-consent__button--reject');
        buttonDecline.addEventListener('click', () => {
            this.cookieStatus('reject');
            this.showStatus();
            this.showContent();
            this.hideGDPR();
        });

    }

    showContent() {
        this.resetContent();
        const status = this.cookieStatus() == null ? 'not-chosen' : this.cookieStatus();
        const element = document.querySelector(`.content-gdpr-${status}`);
        element.classList.add('show');

    }

    resetContent(){
        const classes = [
            '.content-gdpr-accept',

//student uitwerking

            '.content-gdpr-not-chosen'];

        for(const c of classes){
            document.querySelector(c).classList.add('hide');
            document.querySelector(c).classList.remove('show');
        }
    }

    showStatus() {
        document.getElementById('content-gpdr-consent-status').innerHTML =
            this.cookieStatus() == null ? 'Niet gekozen' : this.cookieStatus();
    }

    cookieStatus(status) {

        if (status) {
            localStorage.setItem('gdpr-consent-choice', status);

            //student uitwerking
            console.log(this.getCurrentDate());
            console.log(this.getCurrentTime());

            let object = { date: this.getCurrentDate(), time: this.getCurrentTime() }
            if (object) localStorage.setItem('gdpr-consent-time', JSON.stringify(object));
        }
        return localStorage.getItem('gdpr-consent-choice');
    }

//student uitwerking


    hideGDPR(){
        document.querySelector(`.gdpr-consent`).classList.add('hide');
        document.querySelector(`.gdpr-consent`).classList.remove('show');
    }

    showGDPR(){
        document.querySelector(`.gdpr-consent`).classList.add('show');
    }

    getCurrentDate() {
        const date = new Date();
        let dateString = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        return dateString;
    }

    getCurrentTime() {
        const date = new Date();
        let timeString = date.getHours() + ':' + date.getMinutes();
        return timeString;
    }
}

const gdpr = new GDPR();

