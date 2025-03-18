<div class="{{$viewClass['form-group']}} {!! !$errors->has($errorKey) ? '' : 'has-error' !!}">

    <label for="{{$id}}" class="{{$viewClass['label']}} form-label">{{$label}}</label>

    <div class="{{$viewClass['field']}}">

        @include('admin::form.error')
        
        <input 
            name="{{$name}}" 
            type="hidden" 
            accept="{{@$attributes_obj['accept'] ?: '*'}}"
            value="{{old($column, $value)}}">
        <div class="qcs-upload-button-upload" 
            style="width:{{@$attributes_obj['wdith'] ?: 400}}px;height:{{@$attributes_obj['height'] ?: 300}}px;">
            <img class="qcs-upload-preview">
        </div>
        
        @include('admin::form.help-block')

        <a class="qcs-upload-button-delete">删除</a>

    </div>
</div>