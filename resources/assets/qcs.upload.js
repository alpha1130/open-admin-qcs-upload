class QcsUpload {
    constructor(selector, index, config) {
        if(index !== undefined) {
            selector = selector.replace('__LA_KEY__', index);
        }
        this.input = document.querySelector(`[name="${selector}"]`);
        const parent = this.input.parentElement;
        this.button_upload = parent.querySelector(`.qcs-upload-button-upload`);
        this.button_delete = parent.querySelector(`.qcs-upload-button-delete`);
        this.button_view = parent.querySelector(`.qcs-upload-button-view`);
        this.type = this.button_upload.getAttribute('type');

        this.config = config;
        this.init();
    }

    init() {
        if(this.input.value != '') {
            this.display(this.input.value);
        } else {
            this.remove();
        }

        this.button_delete.addEventListener('click', () => {
            this.remove();
        })

        this.fileInput = document.createElement('input');
        this.fileInput.type = 'file';
        this.fileInput.accept = this.button_upload.getAttribute('accept');
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
                    console.log(data);
                    const url = 'https://' + (
                        this.config.publishDomain 
                        ? data.Location.replace(/^[^\/]+/, this.config.publishDomain) 
                        : data.Location);

                    this.display(url);
                }

                NProgress.done()
                this.fileInput.value = '';
            })
        })

        this.button_upload.addEventListener('click', () => {
            this.fileInput.click();
        })
    }

    display(url) {
        if(this.type == 'video') {
            this.button_upload.innerHTML = '';
            const v = document.createElement('video');
            v.setAttribute('width', '100%');
            v.setAttribute('controls', 'controls');
            const s = document.createElement('source');
            s.src = url;
            v.appendChild(s);
            this.button_upload.appendChild(v);
        } else {
            this.button_upload.style.backgroundImage = `url(${url})`;
            this.button_upload.style.backgroundSize = 'contain';
        }
        
        this.button_delete.style.display = 'inline-block';
        this.button_view.style.display = 'inline-block';
        this.button_view.setAttribute('href', url);
        this.input.value = url;
    }

    remove() {
        if(this.type == 'video') {
            this.button_upload.innerHTML = '';
        } else {
            this.button_upload.style.backgroundImage = '';
            this.button_upload.style.backgroundSize = '50px';
        }
        this.button_delete.style.display = 'none';
        this.button_view.style.display = 'none';
        this.button_view.setAttribute('href', '#');
        this.input.value = '';
    }

}
