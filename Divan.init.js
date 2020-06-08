$(function () {
    const divan = new Divan();
    divan.apiAuth();
    divan.apiChannels();
    divan.apiProgram();

    const divanUI = new DivanUI(divan);
    divanUI.drawChannels();
    divanUI.enableFavoriteChannels();
    divanUI.onGetCode();
    divanUI.drawProgram();
});
