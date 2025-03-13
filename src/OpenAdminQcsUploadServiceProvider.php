<?php

namespace Alpha1130\OpenAdminQcsUpload;

use Illuminate\Support\ServiceProvider;
use OpenAdmin\Admin\Form;

class OpenAdminQcsUploadServiceProvider extends ServiceProvider
{
    /**
     * {@inheritdoc}
     */
    public function boot(OpenAdminQcsUpload $extension)
    {
        if (! OpenAdminQcsUpload::boot()) {
            return ;
        }

        if ($views = $extension->views()) {
            $this->loadViewsFrom($views, 'open-admin-qcs-upload');
        }

        if ($this->app->runningInConsole() && $assets = $extension->assets()) {
            $this->publishes(
                [
                    $assets => public_path('vendor/alpha1130/open-admin-qcs-upload'),
                    __DIR__ . '/../config/qcsupload.php' => config_path('qcsupload.php'),
                ],
                'open-admin-qcs-upload'
            );
        }

        $this->app->booted(function () {
            Form::extend('qcsupload', OpenAdminQcsUploadField::class);
        });
    }
}