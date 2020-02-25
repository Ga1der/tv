/**
 * 
 */
class DivanUI {
    /**
     * 
     */
    constructor(divan) {
        this.divan = divan;
    }

    /**
     * 
     */
    drawChannels() {
        const channels = $('.channels');
        const template = $('#template_channel').html();
        const response_channels = this.divan.response_channels;
        for (let i in response_channels) {
            (() => {
                const channel = response_channels[i];
                const item = template
                    .replace('{{lable.title}}', `${channel.id} \t:\t ${channel.title.RU}`)
                    .replace('{{channel.id}}', `${channel.id}`)
                    .replace('{{channel.name}}', `${channel.title.RU}`)
                    .replace('{{image.src}}', `${channel.image.sm}`)
                    .replace('{{image.title}}', `${channel.description.RU}`);

                channels.append(item);
            })();
        }

        $('#get_code').prop('disabled', false);
    }

    /**
     * 
     */
    enableFavoriteChannals() {
        const favorite = this.divan.getFavoriteChannels();
        $('.channels .channel input').map(function () {
            const channel_id = 1 * this.value;
            const is_favorite = favorite.includes(channel_id);
            this.parentElement.parentElement.style.order = (is_favorite ? 1 : 2);
            this.checked = (is_favorite ? true : false);
        });
    }

    /**
     * 
     */
    onGetCode() {
        const divan = this.divan;
        $('#get_code').on('click', () => {
            $(this).prop('disabled', true);

            if (!divan.response_login) {
                divan.apiRegister();
                divan.apiLogin();
                divan.apiPromoCode();
            }

            // const favorite = {};
            $('.channels .channel input').map((key, element) => {
                element.checked
                    ? divan.apiFavoriteChannelAdd(element.value)
                    : divan.apiFavoriteChannelDelete(element.value);

                // if (element.checked) {
                //     const channel = this.divan.response_channels.find(item => item.id == element.value);
                //     favorite[1 * channel.id] = channel.title.RU;
                // }
            });

            $('#divan_tv').text(JSON.stringify({
                email: divan.response_registration.email,
                login: divan.response_registration.id,
                password: divan.user_password,
                // favorite: divan.user_favorite_channels,
                // favorite: favorite,
            }, null, "  "));

            $(this).prop('disabled', false);
        });
    }
}
