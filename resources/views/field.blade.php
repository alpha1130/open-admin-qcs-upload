<div class="{{$viewClass['form-group']}} {!! !$errors->has($errorKey) ? '' : 'has-error' !!}">

    <label for="{{$id}}" class="{{$viewClass['label']}} form-label">{{$label}}</label>

    <div class="{{$viewClass['field']}}">

        @include('admin::form.error')
        
        <input id="{{$id}}" 
            name="{{$name}}" 
            class="qcs-upload-{{$id}}" 
            type="hidden" 
            accept="{{@$attributes_obj['accept'] ?: '*'}}"
            value="{{old($column, $value)}}">
        <div class="qcs-upload-button-upload qcs-upload-button-upload-{{$id}}" 
            style="width:{{@$attributes_obj['wdith'] ?: 400}}px;height:{{@$attributes_obj['height'] ?: 300}}px;">
            <img class="qcs-upload-preview qcs-upload-preview-{{$id}}">
        </div>
        
        @include('admin::form.help-block')

        <a class="qcs-upload-button-delete qcs-upload-button-delete-{{$id}}">删除</a>

    </div>
</div>