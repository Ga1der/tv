$(function () {
    const divan = new Divan();
    const divanUI = new DivanUI(divan);

    divan.apiAuth();
    divan.apiChannels();

    divanUI.drawChannels();
    divanUI.enableFavoriteChannels();
    divanUI.onGetCode();

    divan.apiProgram();
    divanUI.drawProgram();
});
