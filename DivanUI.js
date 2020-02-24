            class DivanUI 
            {
                constructor (divan) 
                {
                    this.divan = divan;
                }

                drawChannels () 
                {
                    const response_channels = this.divan.response_channels; 
                    for (let i in response_channels) {
                        (function () {
                            let channel       = response_channels[i],
                                input         = $(`<input type="checkbox" class="channel" value="${channel.id}" hidden/>`),
                                image         = $(`<img src="${channel.image.sm}" class="channel"/>`),
                                label         = $(`<label title="${channel.id}   \t:\t ${channel.title.RU}" style="cursor: pointer;"/>`),
                                channels      = $('.channels');
                            label.addClass('col');
                            label.append(input);
                            label.append(image);
                            channels.append(label);
                        }());
                    }

                    $('#get_code').prop('disabled', false);
                }

                enableFavoriteChannals () 
                {
                    const favorite = this.divan.getFavoriteChannels();
                    $('.channels input.channel').map(function () {
                        const channel_id = 1 * this.value;
                        // const is_favorite = (-1 < favorite.indexOf(channel_id));
                        const is_favorite = favorite.includes(channel_id);
                        this.parentElement.style.order = (is_favorite ? 1 : 2);
                        this.checked = (is_favorite ? true : false);
                    });
                }

                onGetCode () 
                {
                    const divan = this.divan;
                    $('#get_code').on('click', () =>  {
                        if (!divan.response_login) {
                            divan.apiRegister();
                            divan.apiLogin();
                            divan.apiPromoCode();
                        }

                        $('.channels input.channel').map((key, element) => {
                            element.checked
                                ? divan.apiFavoriteChannelAdd(element.value)
                                : divan.apiFavoriteChannelDelete(element.value);
                        });
                        
                        $('#divan_tv').text(JSON.stringify({
                            email: divan.response_registration.email,
                            login: divan.response_registration.id,
                            password: divan.user_password,
                            favorite: divan.user_favorite_channels,
                        }, null, "  "));
                    });
                }
            }
