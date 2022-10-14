class AlertUI {
    constructor() {
        this.alertContainer = document.querySelector('.alert-container')
    }

    renderAlert(type) {
        const alert = AlertUI.alertTemplate(type)
        this.alertContainer.insertAdjacentHTML('afterbegin', alert)
    }

    clearAlertContainer() {
        this.alertContainer.innerHTML = ''
    }

    static alertTemplate() {
        return `
            <div class="alert alert-danger alert-dismissible fade show shadow" role="alert">
                <strong><i class="bi bi-exclamation-triangle-fill"></i> Be attention!</strong> All fields must be filled!
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `
    }
}

const alertUi = new AlertUI();
export default alertUi