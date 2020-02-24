$(function () {
    const divan = new Divan();
    divan.apiAuth();
    divan.apiChannels();

    const divanUI = new DivanUI(divan);
    divanUI.drawChannels();
    divanUI.enableFavoriteChannals();
    divanUI.onGetCode();
});
