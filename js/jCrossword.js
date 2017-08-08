/* Crossword plugin
 * Author: jan.madeyski
 */
(function ($) {
    var cfg = {
        target: '#crossword-wrapper'
    };
    var $wrapper, $krzyzowka, $pytania, $lines = {}, key, i, k, krzyzowka, fraza, odpowiedz, litera, maxPozycja;
    var krzyzowki = [
        {
            haslo: 'Jezus',
            frazy: {
                1: { pytanie: 'Stolica państwa Dawida to...?', odpowiedz: 'Jerozolima', pozycja: 1 },
                2: { pytanie: 'Ewangelista Łukasz był z zawodu...?', odpowiedz: 'Lekarzem', pozycja: 2 },
                3: { pytanie: 'Ojciec Jana Chrzciciela?', odpowiedz: 'Zachariasz', pozycja: 1 },
                4: { pytanie: 'Ur', odpowiedz: 'Ur', pozycja: 1 },
                5: { pytanie: 'Jezus przy studni rozmawiał z...?', odpowiedz: 'Samarytanką', pozycja: 1 },
            } // frazy
        } // krzyzowka 1
    ];

    $krzyzowka = $('<div class="crossword-crossword"></div>');
    $pytania = $('<div class="crossword-questions"><ol></ol></div>');
    $wrapper = $(cfg.target);

    k = Math.floor(Math.random() * krzyzowki.length) + 0;
    krzyzowka = krzyzowki[k];
    maxPozycja = 1;
    for (key in krzyzowka.frazy) {
        maxPozycja = krzyzowka.frazy[key].pozycja > maxPozycja ? krzyzowka.frazy[key].pozycja : maxPozycja;
    }
    for (key in krzyzowka.frazy) {
        fraza = krzyzowka.frazy[key]
        $pytania.find('ol').append('<li>' + fraza.pytanie + '</li>');
        $lines[key] = $('<div class="crossword-line" data-line="' + key + '"></div>');
        $lines[key].append(('<div class="crossword-box"></div>').repeat(maxPozycja - fraza.pozycja));
        odpowiedz = fraza.odpowiedz.split('');
        odpowiedz.forEach(function (litera, i) {
            $lines[key].append('<input type="text" value="" maxlength="1" class="crossword-input ' + (i == (fraza.pozycja - 1) ? 'crossword-input-bold' : '') + '" />');
        });
        $krzyzowka.append($lines[key]);
    }

    var $btn_fill_all = $('<a href="#" class="btn btn-primary">Wypełnij wszystko</a>');

    $wrapper.append($krzyzowka);
    $wrapper.append($pytania);
    $wrapper.append($btn_fill_all);

    $btn_fill_all.click(function () {
        console.log('krzyzowka', krzyzowka);
        var odpowiedz;
        for (key in krzyzowka.frazy) {
            $wrapper.find('.crossword-line[data-line="' + key + '"] input').each(function (i) {
                odpowiedz = krzyzowka.frazy[key].odpowiedz.split('');
                $(this).val(odpowiedz[i]);
            });
        }
    });

})(jQuery);
