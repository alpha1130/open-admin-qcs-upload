QCS Upload Extension for open-admin

## Installation

```bash
composer require alpha1130/open-admin-qcs-upload
php artisan vendor:publish --tag=open-admin-qcs-upload
```

## Usage

```php
$config = [
    'secretId' => env('QCLOUD_COS_SECRET_ID', ''),
    'secretKey' => env('QCLOUD_COS_SECRET_KEY', ''),
    'bucket' => env('QCLOUD_COS_BUCKET', ''),
    'region' => env('QCLOUD_COS_REGION', 'ap-guangzhou'),
    'durationSeconds' => 6000,
    'publisDomain' => '',
    'allowPrefix' => ['*'],
    'keyPrefix' => '',
];

$form->qcsupload('field-name')
    ->addVariables(['config' => $config])
    ->attribute('style', 'width: 100px; height: 100px;')
    ->attribute('accept', 'image/png, image/jpeg, image/jpg')
    ->help(sprintf('Size: 80 x 80, Format: png, jpg, jpeg'));
```

License
------------
Licensed under [The MIT License (MIT)](LICENSE).