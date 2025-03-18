class QcsUpload {
    constructor(selector, index, config) {
        if(index !== undefined) {
            selector = selector.replace('__LA_KEY__', index);
        }
        this.input = document.querySelector(`[name="${selector}"]`);
        const parent = this.input.parentElement;
        this.button_upload = parent.querySelector(`.qcs-upload-button-upload`);
        this.button_delete = parent.querySelector(`.qcs-upload-button-delete`);
        this.preview = parent.querySelector(`.qcs-upload-preview`);
        this.config = config;
        this.init();
    }

    init() {
        if(this.input.value != '') {
            this.preview.setAttribute('src', this.input.value);
            this.preview.style.display = 'block';
            this.button_delete.style.display = 'inline-block';
        } else {
            this.preview.removeAttribute('src');
            this.preview.style.display = 'none';
            this.button_delete.style.display = 'none';
        }

        this.preview.addEventListener('click', (e) => {
            e.stopPropagation();
            return;
        })

        this.button_delete.addEventListener('click', () => {
            this.preview.style.display = 'none';
            this.preview.removeAttribute('src');
            this.button_delete.style.display = 'none';
            this.input.value = '';
        })

        this.fileInput = document.createElement('input');
        this.fileInput.type = 'file';
        this.fileInput.accept = this.input.getAttribute('accept');
        this.fileInput.style.display = 'none';
        this.fileInput.addEventListener('change', () => {
            const files = this.fileInput.files;

            if (!files || !files.length) {
                return;
            }

            const suffix = files[0].name.match(/[A-Za-z0-9]+$/)[0];
            
            (new COS({
                SecretId: this.config.credentials.tmpSecretId,
                SecretKey: this.config.credentials.tmpSecretKey,
                SecurityToken: this.config.credentials.sessionToken,
                StartTime: this.config.startTime,
                ExpiredTime: this.config.expiredTime,
            })).uploadFile({
                Bucket: this.config.bucket,
                Region: this.config.region,
                Key: this.config.keyPrefix + uuidv4() + '.' + suffix,
                Body: files[0],
                onProgress: (progressData) => {
                    NProgress.set(progressData.percent)
                }
            }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    const url = '//' + data.Location;
                    this.preview.setAttribute('src', url);
                    this.preview.style.display = 'block';
                    this.button_delete.style.display = 'inline-block';
                    this.input.value = url;
                }

                NProgress.done()
                this.fileInput.value = '';
            })
        })

        this.button_upload.addEventListener('click', () => {
            this.fileInput.click();
        })
    }

}