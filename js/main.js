    /* ========================================  Start script for showing and hidding divs on click and validate questions ============================================ */
    var check_form = {};
    var form_inputs = $('.forms input');
    var allow_submit = 0;
    form_inputs.each(function () {
        if(this.type == 'hidden'){
            return true;
        }
        check_form[this.name] = {
            'type' : this.type,
            'name' : this.name,
            'value' : ''
        };
    });
    var cf_keys = Object.keys(check_form);
    form_inputs.change(function () {
        check_form[this.name]['value'] = this.value;
    });
    var next_button = document.getElementById('next_button');
    var send_button = document.getElementById('send_button');
    var wizard_setup =  document.getElementsByClassName('wizard-step');
    var remove_custom_style = document.querySelectorAll('.wizard-step .container-buttom .checkmark_color');
    var page = 0;
    var page_helper = 0;
    var length = wizard_setup.length;
    if (window.innerWidth < 767) {
        var counter = 2;
        var count_question = document.getElementsByClassName('count_question')[0];
        var list_element = document.getElementsByClassName('wizard-step').length;
        count_question.innerHTML = (counter -1) + ' / ' + list_element;

        for (var index = 0; index < wizard_setup.length; index++) {
            wizard_setup[index].style.display = 'none';
        }
        wizard_setup[page].style.display = 'inline';
        next_button.addEventListener("click", function (event) {
            event.preventDefault;
            let is_checkbox_value = 0;
            let is_other_values = 0;
            if(check_form[cf_keys[page_helper]]['type'] == 'radio'){
                if(!check_form[cf_keys[page_helper]]['value']){
                    alert('Sva polja su obavezna!');
                    return false;
                }else{

                }
            }else{
                if(check_form[cf_keys[page_helper]]['type'] == 'checkbox'){
                    let cb_length = page_helper+9;
                    let i = page_helper;
                    for(i; i<cb_length; i++){
                        if(check_form[cf_keys[i]]['value']){
                            is_checkbox_value++;
                        }
                    }
                    if(!is_checkbox_value){
                        alert('Odaberite barem jedan odgovor!');
                        return false;
                    }else{
                        page_helper = cb_length;
                    }
                }else{
                    let oth_length = page_helper+8;
                    let num_filled = 0;
                    let alloth_filled = 8;
                    let i = page_helper;
                    for(i; i<oth_length; i++){
                        if(check_form[cf_keys[i]]['value']){
                            num_filled++;
                        }
                    }
                    if(num_filled != alloth_filled){
                        alert('Sva polja su obavezna!');
                        return false;
                    }else{
                        page_helper = oth_length;
                    }
                }
            }
            mobileProgressBar();
            if (page < length - 1) {
                wizard_setup[page].style.display = 'none';
                page++;
                page_helper++;
                wizard_setup[page].style.display = 'inline';
                if (page == length - 1) {
                    next_button.style.display = 'none';
                    send_button.style.display = 'inline';
                    wizard_setup[page].classList.remove('last-step-form');
                    remove_custom_style.forEach(function(el) {el.classList.remove('checkmark_color');})
                }
            }
        });
        function mobileProgressBar(){
            var procent =  (100 / list_element) * counter;
            document.getElementById("myBar-mobile").style.width = procent + "%";
            count_question.innerHTML =   counter +  " / "  + list_element;
            counter++;
        }
    }else{
        next_button.style.display = 'none';
        send_button.style.display = 'inline';
        $('#send_button').click(function (event) {
            if(!allow_submit){
                event.preventDefault();
                let keys = Object.keys(check_form);
                let i;
                let is_checkbox_value = 0;
                for(i = 0; i<cf_keys.length; i++){
                    if(check_form[cf_keys[i]]['type'] == 'checkbox'){
                        if(check_form[cf_keys[i]]['value']){
                            is_checkbox_value++;
                        }
                    }else{
                        if(!check_form[cf_keys[i]]['value']){
                            alert('Sva polja su obavezna!');
                            return false;
                        }
                    }
                }
                if(!is_checkbox_value){
                    alert('Odaberite barem jedan odgovor!');
                    return false;
                }
                console.log('sve je popunjeno!');
                allow_submit = 1;
                $(this).trigger('click');
            }
        });
        // When the user scrolls the page, execute windowScroll
        window.onscroll = function() {windowScroll()};
        function windowScroll() {
            var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrolled = (winScroll / height) * 100;
            document.getElementById("myBar").style.width = scrolled + "%";
        }
    }

    /*-- ========================================  End script for showing and hidding divs on click and validate questions ============================================ --*/



    /* ========================================  Start changing year and add + 10 ============================================ */

    document.getElementById('MMERGE102').addEventListener("keyup", changeYear);

    function changeYear() {
        let sendYear = document.getElementById('MMERGE13');
        let realYear = document.getElementById('MMERGE23');
        sendYear.value = '';
        realYear.value = '';
        let year = document.getElementById('MMERGE102').value;
        const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);
        let fullage = getAge(year);
        realYear.value = fullage;
        let addFourYear = fullage + 10;
        sendYear.value = addFourYear;
    }
    /* ========================================  end changing year and add + 10 ============================================ */