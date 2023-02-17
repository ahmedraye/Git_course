
$(document).ready(function()
{
    let checkAll                = $('input[id=selectAll]');
    let checkBox                = $('input[id=soldierchecked]')
    let editTmam                = $('a[id=edit]');
    let activeSelect            = $('td.activeTD');
    let updateData              = $('a[id=check]');
    
    checkAll.on('change',function ()
    {
        checkBox.removeAttr('checkBox');
        checkBox.attr('checked','checked');
           
    });

    updateData.on('click',function ()
    {
        let token            = $('input[name=_token]').val();
        let id               = $(this).attr('data-id');
        let placeSelect      = $('select[id=place_id_'+ id +']');
        let tmamSelect       = $('select[id=tmam_id_' + id +']');
        let attacheSelect    = $('select[id=attache_id_' + id +']');

        

        $.ajax({
            url: '/soldier/public/updateTmamnonOfficer',
            data:{
                _token:token,
                id:id,
                place:placeSelect.val(),
                tmam:tmamSelect.val(),
                attache:attacheSelect.val()
            },
            error: function()
            {
                console.log($(this).val() + 'error');
            },
            success: function(data)
            {
                editTmam.show();
                editTmam.parent('div').parent('td').parent('tr').css('background', '#FFF');
                updateData.hide();
                tmamSelect.attr('disabled','disabled'); 
                attacheSelect.attr('disabled','disabled');
                placeSelect.attr('disabled','disabled');
            },
            type: 'POST'
        });

    });


    editTmam.on('click',function ()
    {
        let id            = $(this).attr('data-id');
     
        let attacheInput  = $('select[id=attache_id_'+id+']');
        let placeInput    = $('select[id=place_id_'+id+']');
        let TmamInput     = $('select[id=tmam_id_'+id+']');

        attacheInput.removeAttr('disabled');
        attacheInput.addClass('activeSelect');
     
        $(this).parent('div').parent('td').parent('tr').css('background', '#0d6efd52');
        $(this).hide();

        $('a[dds=check_'+ id +']').toggle();
    });
    
    
    

    activeSelect.on('change',function ()
    {
        let token                   = $('input[name=_token]').val();
        let numberOfRow             = $(this).children('select').attr('data_id');
        let attache                 = $(this).children('select');
        
        $.ajax({
            url: '/soldier/public/GetplaceByAttache',
            data:{
                _token:token,
                attache:$(this).children('select').val()
            },
            error: function()
            {
                console.log($(this).val() + 'error');
            },
            success: function(data)
            {
                if (data !== null)
                {   
                    let placeSelect      = $('select[id=place_id_'+ numberOfRow +']');
                    let tmamSelect       = $('select[id=tmam_id_' + numberOfRow +']');

                    placeSelect.removeAttr('disabled');
                    placeSelect.find('option').remove();
                    $.each(data,function (index, value)
                    {
                        placeSelect.append(new Option(data[index].name, value.id));
                    });

                    if(attache.val() == 3)
                    {
                        tmamSelect.removeAttr('disabled'); 
                    }
                    else
                    {
                        tmamSelect.find('option[value=0]').attr('selected','selected')
                        tmamSelect.attr('disabled','disabled');
                    }
                }
            },
            type: 'POST'
        });
    });


   
});
