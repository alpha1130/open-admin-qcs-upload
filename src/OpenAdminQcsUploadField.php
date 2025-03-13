<?php

namespace Alpha1130\OpenAdminQcsUpload;

use OpenAdmin\Admin\Form\Field;

class OpenAdminQcsUploadField extends Field
{
    protected $view = 'open-admin-qcs-upload::field';

    protected static $css = [
        '/vendor/alpha1130/open-admin-qcs-upload/qcs.upload.css',
    ];

    protected static $js = [
        '//cdn.jsdelivr.net/npm/uuid@latest/dist/umd/uuidv4.min.js',
        '//cdn.jsdelivr.net/npm/cos-js-sdk-v5/dist/cos-js-sdk-v5.min.js',
        '/vendor/alpha1130/open-admin-qcs-upload/qcs.upload.js',
    ];

    public function render()
    {
        $config = OpenAdminQcsUploadHelper::buildQCSTempKeys(config('qcsupload'));
        $json = json_encode($config);

        $this->script = "new QcsUpload('{$this->getId()}', {$json});";

        return parent::render();
    }
}