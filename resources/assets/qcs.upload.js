class QcsUpload {
    constructor(selector, config) {
        this.input = document.querySelector(`.qcs-upload-${selector}`);
        this.image = document.querySelector(`.qcs-upload-image-${selector}`);
        this.config = config;
        this.init();
    }

    init() {
        if(this.input.value != '') {
            this.image.setAttribute('src', this.input.value);
        }

        this.fileInput = document.createElement('input');
        this.fileInput.type = 'file';
        this.fileInput.accept = 'image/*';
        this.fileInput.style.display = 'none';
        this.fileInput.addEventListener('change', (e) => {
            (new COS({
                SecretId: this.config.credentials.tmpSecretId,
                SecretKey: this.config.credentials.tmpSecretKey,
                SecurityToken: this.config.credentials.sessionToken,
                StartTime: this.config.startTime,
                ExpiredTime: this.config.expiredTime,
            })).uploadFile({
                Bucket: this.config.bucket,
                Region: this.config.region,
                Key: this.config.keyPrefix + files[0].name,
                Body: files[0],
                onProgress: (progressData) => {
                    NProgress.set(progressData.percent)
                }
            }, (err, data) => {
                NProgress.done()
                if (err) {
                    console.log(err);
                } else {
                    this.image.setAttribute('src', '//' + data.Location)
                }
                this.fileInput.value = '';
            })
        })

        this.image.addEventListener('click', () => {
            this.fileInput.click();
        })
    }
}