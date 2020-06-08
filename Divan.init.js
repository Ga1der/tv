$(function () {
    const divan = new Divan();
    divan.apiAuth();
    divan.apiChannels();

    const divanUI = new DivanUI(divan);
    divanUI.drawChannels();
    divanUI.enableFavoriteChannels();
    divanUI.onGetCode();

    // setTimeout(() => {
    //     divan.apiProgram();
    //     divanUI.drawProgram();
    // }, 1);
});
