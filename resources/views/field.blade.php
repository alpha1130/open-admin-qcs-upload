<div class="{{$viewClass['form-group']}} {!! !$errors->has($errorKey) ? '' : 'has-error' !!}">
    <label for="{{$id}}" class="{{$viewClass['label']}} form-label">{{$label}}</label>
    <div class="{{$viewClass['field']}}">
        @include('admin::form.error')
        <input 
            name="{{$name}}" 
            type="hidden" 
            value="{{old($column, $value)}}"
            >
        <div class="qcs-upload-button-upload" {!! $attributes !!} ></div>
        @include('admin::form.help-block')
        <a class="qcs-upload-button-delete">删除</a>
        <a class="qcs-upload-button-view" target="_blank">查看</a>
    </div>
</div>