/**
 * 
 */
class Divan {
    /**
     * 
     */
    constructor() {
        this.client_key = '8a66efabeee725d313673361fa3728c21430809f'; // magic!

        this.user_email = new Date().getTime() + '@mail.com';
        this.user_password = 11111111;
        this.user_code = '010ysxi155';
        this.user_favorite_channels = {};

        this.response_authorization;
        this.response_channels;
        this.response_registration;
        this.response_login;
    }

    sleep(ms) {
        const end = ms + Date.now();
        while (end > Date.now()) {
            // ... 
        }
        return true;
    }

    /**
     * 
     */
    apiAuth() {
        $.ajax({
            async: false,
            method: 'get',
            url: 'https://api.divan.tv/v1/authorization',
            headers: {
                //'Origin': 'https://galder.io.ua'
            },
            data: {
                client_key: this.client_key,
                device_type: 1,
            },
            success: (data, textStatus, jqXHR) => {
                this.response_authorization = data.data;
                console.info(this.response_authorization);
            },
            error: () => {
                this.sleep(1000);
                this.apiAuth();
            }
        });

        return this;
    }

    /**
     * 
     */
    apiChannels() {
        $.ajax({
            async: false,
            method: 'get',
            url: 'https://api.divan.tv/v1/channels/browse',
            data: {
                authorization_key: this.response_authorization.authorization_key,
                limit: 999,
            },
            success: (data, textStatus, jqXHR) => {
                this.response_channels = data.data.data;
                console.info(this.response_channels);
            },
            error: () => {
                this.apiChannels();
            }
        });

        return this;
    }

    /**
     * 
     */
    getFavoriteChannels() {
        let favorite = window.localStorage.getItem('user_favorite_channels');
        if (!favorite) return [
            2, 14, 8, 67, 18, 19, 135, 29, 148, 152, 342, 1051,
            704, 1167, 1224, 1174, 116, 306, 258, 34, 10, 1378
        ];
        favorite = JSON.parse(favorite);
        favorite = Object.keys(favorite);
        favorite = favorite.map((id, name) => 1 * id);
        console.log(favorite);

        return favorite;
    }

    /**
     * 
     */
    favoriteChannelAdd(channel_id) {
        const channel = this.response_channels.find(element => element.id == channel_id);
        this.user_favorite_channels[channel_id] = channel.title.RU;
        window.localStorage.setItem('user_favorite_channels', JSON.stringify(this.user_favorite_channels));
    }

    /**
     * 
     */
    favoriteChannelRemove(channel_id) {
        delete this.user_favorite_channels[channel_id];
        window.localStorage.setItem('user_favorite_channels', JSON.stringify(this.user_favorite_channels));
    }

    /**
     * 
     */
    apiRegister() {
        $.ajax({
            async: false,
            method: 'post',
            url: 'https://api.divan.tv/v1/accounts/registration/',
            data: {
                authorization_key: this.response_authorization.authorization_key,
                email: this.user_email,
                password: this.user_password,
                lang_code: 'RU',
            },
            success: (data, textStatus, jqXHR) => {
                this.response_registration = data.data.data;
                console.info(this.response_registration);
            },
            error: () => {
                this.apiRegister();
            }
        });
    }

    /**
     * 
     */
    apiLogin() {
        $.ajax({
            async: false,
            method: 'post',
            url: 'https://api.divan.tv/v1/accounts/login/',
            data: {
                authorization_key: this.response_authorization.authorization_key,
                login: this.user_email,
                password: this.user_password,
            },
            success: (data, textStatus, jqXHR) => {
                this.response_login = data.data.data;
                console.info(this.response_login);
            },
            error: () => {
                this.apiLogin();
            }
        });
    }

    /**
     * 
     */
    apiPromoCode() {
        $.ajax({
            async: true,
            method: 'post',
            url: 'https://api.divan.tv/v1/promomarkers/activate/',
            data: {
                authorization_key: this.response_authorization.authorization_key,
                code: this.user_code,
            },
            success: (data, textStatus, jqXHR) => {
                console.info(data.data);
            },
            error: () => {
                this.apiPromoCode();
            }
        });
    }

    /**
     * 
     */
    apiFavoriteChannelAdd(channel_id) {
        $.ajax({
            async: true,
            method: 'post',
            url: 'https://api.divan.tv/v1/channels_favorites/add/',
            data: {
                authorization_key: this.response_authorization.authorization_key,
                channel_id: channel_id,
            },
            success: (data, textStatus, jqXHR) => {
                console.info(data.data.data);
                this.favoriteChannelAdd(channel_id);
            },
            error: () => {
                this.apiFavoriteChannelAdd(channel_id);
            }
        });
    }

    /**
     * 
     */
    apiFavoriteChannelDelete(channel_id) {
        $.ajax({
            async: true,
            method: 'post',
            url: 'https://api.divan.tv/v1/channels_favorites/remove/',
            data: {
                authorization_key: this.response_authorization.authorization_key,
                channel_id: channel_id,
            },
            success: (data, textStatus, jqXHR) => {
                console.info(data.data.data);
                this.favoriteChannelRemove(channel_id);
            },
            error: () => {
                this.apiFavoriteChannelDelete(channel_id);
            }
        });
    }
}
