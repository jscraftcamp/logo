const theMovie = () => {
  var color = '#ff00ff';

  var offsetDueToHardcodedPathForFrame = { x: -120, y: -123 };
  var movieScale = stage.width / 300;
  var mainMovie = new Movie().addTo(stage)
    .attr(offsetDueToHardcodedPathForFrame)
    .attr({
      scale: movieScale,
      origin: { x: -offsetDueToHardcodedPathForFrame.x, y: -offsetDueToHardcodedPathForFrame.y }
    })
  ;

  var rects = new Group().addTo(mainMovie);
  rects.attr({ scale: 0.2, rotation: -0.25 * Math.PI, y: 200 });

  var overlay = new Group().addTo(mainMovie);
  overlay
    .attr({ x: 120, y: 45, scale: 0.87, origin: { x: 0, y: 0 } })
  ;

  var rect = new Rect(0, 0, 100, 100)
    .attr({ fillColor: color, rotation: 0.25 * Math.PI, origin: { x: 0, y: 0 }, scaleY: 2 })
  ;

  var box = rect.getAbsoluteBoundingBox();

  function cloneRect(xMultiplier, yMultiplier) {
    let x = xMultiplier * box.width;
    let y = yMultiplier * box.height;
    var newRect = rect
      .clone({ attributes: true })
      .attr({ matrix: rect.attr().matrix })
      .attr({ x: x, y: y })
      .addTo(rects)
    ;
    if (previousYears[0].x === xMultiplier && previousYears[0].y === yMultiplier) {
      var other = new Star(x + 20, y + 140, 100, 12).attr({ fillColor: '#3399ff', scale: 2 });

      var morphAnim = function() {
        this.morphTo(other, '0.5s');
        var that = this;
        setTimeout(function() {
          var actualRect = rect.clone({ attributes: true }).attr({
            fillColor: '#3399ff',
            matrix: rect.attr().matrix
          }).attr({ x: x, y: y });
          that.morphTo(actualRect, '0.5s');
        }, 1500);
      };
      newRect.on('pointermove', morphAnim);
      newRect.on('click', morphAnim);
    } else {
      var rotateAnim = function() { this.animate('0.4s', { rotation: Math.PI * 2.35 }) };
      newRect.on('pointermove', rotateAnim);
      newRect.on('click', rotateAnim);
    }
    return newRect;
  }

  var previousYears = [{ x: 3, y: 5 }, { x: 4, y: 5 }];
  for (var row = 0; row < 11; row++) for (var column = 0; column < 6; column++) {
    if (previousYears[0].x === row && previousYears[0].y === column) continue;
    if (previousYears[1].x === row && previousYears[1].y === column) continue;
    cloneRect(row, column);
  }

  cloneRect(previousYears[0].x, previousYears[0].y).attr({ fillColor: '#ff9800' });
  cloneRect(previousYears[1].x, previousYears[1].y).attr({ fillColor: '#3399ff' });

  var theFrame = new Path("m 292.57164,1057.7483 c -1.2414,0 -2.4621,-0.2275 -3.6207,-0.662 C 286.09574,1056.0311 2.9164393,946.31386 2.9164393,622.18972 V 385.33455 c 0,-5.71035 4.6345,-10.34483 10.3448997,-10.34483 H 571.88194 c 5.7104,0 10.3449,4.63448 10.3449,10.34483 v 236.85517 c 0,324.12414 -283.1793,433.82068 -286.0345,434.89658 -1.1586,0.4345 -2.3793,0.662 -3.6207,0.662 z M 23.606139,395.67938 v 226.51034 c 0,290.19311 236.606901,400.36548 268.965501,414.04138 32.3379,-13.7172 268.9655,-124.24138 268.9655,-414.04138 V 395.67938 H 23.606139 z")
    .attr({ fillColor: 'black', scale: 0.51, y: -102, x: -2 })
    .addTo(overlay)
  ;

  var jsText = new Path("m 187.27876,962.52425 c -0.16999,-0.17579 -2.28507,-0.48574 -4.7006,-0.68878 -2.41554,-0.20306 -4.81129,-0.58331 -5.32523,-0.84504 -0.51296,-0.26173 -2.21984,-0.64376 -3.79231,-0.84897 -3.79132,-0.49473 -16.1902,-4.68376 -20.44209,-6.90586 -9.61369,-5.02573 -18.42386,-11.40826 -23.33104,-16.90232 -8.16873,-9.14701 -10.26799,-11.99772 -14.99231,-20.35425 -3.02732,-5.35575 -3.00854,-5.87205 0.26785,-7.22892 0.9676,-0.40081 1.75927,-0.93086 1.75927,-1.17788 0,-0.24701 0.86679,-0.80518 1.92728,-1.24036 1.0595,-0.43518 2.4442,-1.26812 3.07675,-1.85098 0.63254,-0.58285 1.38072,-1.05974 1.66338,-1.05974 0.28268,0 2.08543,-1.06741 4.00678,-2.37204 1.92136,-1.30461 3.64802,-2.37204 3.83876,-2.37204 0.18976,0 3.47308,-1.96372 7.297,-4.3638 8.10253,-5.0867 17.80121,-10.82615 19.17799,-11.3497 0.61673,-0.23464 1.0872,0.0176 1.3155,0.70642 0.66318,1.99423 7.3909,12.31756 10.27588,15.76666 3.18152,3.80379 8.60362,7.98107 12.66475,9.7561 5.62768,2.46043 7.28218,2.75028 15.40545,2.69964 6.93229,-0.0432 8.58582,-0.2501 12.33563,-1.54346 9.08294,-3.13329 14.02569,-8.98562 17.15976,-20.31998 0.87766,-3.17404 0.99032,-13.49882 1.17416,-108.2745 l 0.20458,-104.76589 4.48614,-0.42039 c 3.2576,-0.30531 50.91593,-0.0503 52.28678,0.27974 0.0988,0.0236 0.0693,48.27702 -0.0693,107.22974 -0.22633,96.84752 -0.34591,107.61579 -1.23049,111.63436 -0.53766,2.44617 -1.10992,5.24816 -1.27003,6.22662 -0.59696,3.64694 -3.81307,13.83554 -5.33413,16.90081 -0.40523,0.81541 -1.02591,2.14968 -1.38074,2.96507 -2.73971,6.30073 -6.83544,12.04131 -13.0245,18.25392 -10.82839,10.87017 -23.39132,17.19406 -41.61456,20.94762 -4.95659,1.02094 -9.00883,1.3392 -19.86587,1.56019 -7.50159,0.15269 -13.77764,0.13379 -13.94762,-0.042 z m 219.72252,-0.48312 c -10.4963,-1.41854 -23.34093,-4.37273 -30.54008,-7.02394 -5.36181,-1.97464 -17.46023,-7.8577 -19.02281,-9.25092 -0.51493,-0.45888 -1.24928,-0.83433 -1.63078,-0.83433 -0.38249,0 -0.69481,-0.26685 -0.69481,-0.593 0,-0.32617 -0.33406,-0.59451 -0.74127,-0.59632 -0.64935,-0.003 -3.52842,-2.12021 -11.08436,-8.15229 -7.70026,-6.14691 -19.02775,-20.19475 -23.12843,-28.68114 -0.67109,-1.38863 -1.21962,-2.57767 -1.21962,-2.64231 0,-0.11715 7.53025,-4.68279 9.78468,-5.93246 0.65231,-0.3616 2.25345,-1.27072 3.55806,-2.02029 1.30463,-0.74954 3.5729,-2.02794 5.0406,-2.84085 1.46771,-0.81294 2.93541,-1.68075 3.26156,-1.92851 0.32616,-0.24776 1.52701,-0.9664 2.66855,-1.597 3.14099,-1.73526 9.96062,-5.65522 12.0668,-6.93606 1.02788,-0.62512 3.66283,-2.13539 5.85598,-3.35617 l 3.988,-2.21958 2.47977,3.65268 c 3.91784,5.76972 4.667,6.69724 9.89736,12.24448 4.88148,5.17769 13.12334,11.41589 17.64702,13.35696 12.27238,5.26653 21.88212,6.684 36.08968,5.32369 11.39274,-1.09074 22.4188,-6.76154 27.38724,-14.08564 0.93696,-1.38196 1.85514,-2.64605 2.03798,-2.80913 0.18384,-0.16307 0.91917,-2.17201 1.63276,-4.46432 3.97416,-12.75769 -1.273,-24.96748 -14.42203,-33.5575 -4.48712,-2.93155 -16.55984,-8.9404 -26.08657,-12.98403 -3.26157,-1.38434 -7.2644,-3.12282 -8.89517,-3.86329 -1.63078,-0.74047 -4.03247,-1.7851 -5.3371,-2.3214 -21.4769,-8.82876 -37.90923,-18.95908 -49.04598,-30.23737 -3.52052,-3.56505 -6.40057,-6.7006 -6.40057,-6.96789 0,-0.2673 -0.46749,-1.00057 -1.03776,-1.62952 -1.62289,-1.78853 -2.52031,-2.9342 -2.52031,-3.21842 0,-0.14352 -1.06742,-2.01793 -2.37204,-4.16539 -1.30463,-2.14745 -2.37204,-4.16802 -2.37204,-4.49015 0,-0.32214 -0.54459,-1.5542 -1.20877,-2.73793 -0.66515,-1.18373 -1.57345,-3.52682 -2.01919,-5.20689 -0.44476,-1.68005 -1.12771,-3.85521 -1.51712,-4.83367 -2.82076,-7.09526 -3.69248,-29.90606 -1.53492,-40.18246 2.54303,-12.11754 5.58617,-18.79642 14.36175,-31.52045 2.67547,-3.8788 9.04144,-9.69225 15.84823,-14.47129 3.67864,-2.58313 16.01426,-9.00412 17.29813,-9.00412 0.38151,0 1.52503,-0.41475 2.54105,-0.92167 1.01602,-0.50693 3.12517,-1.14887 4.68677,-1.42651 1.5616,-0.27767 4.44066,-0.90034 6.3976,-1.38373 6.77317,-1.67325 12.22591,-2.1982 22.83093,-2.1982 14.84901,0 28.28664,2.24338 38.84225,6.48452 4.59287,1.84555 8.13216,3.60441 11.11401,5.52396 1.89961,1.22308 3.59068,2.22379 3.75574,2.22379 0.16605,0 0.62464,0.26079 1.018,0.57954 7.22584,5.84628 9.25987,7.67615 12.91678,11.61834 5.58616,6.02051 14.49615,18.77489 13.54733,19.39084 -0.13639,0.0886 -1.71577,1.12708 -3.50963,2.30796 -7.28317,4.79403 -19.0495,12.3582 -19.22443,12.3582 -0.1028,0 -3.42761,2.13484 -7.38794,4.74409 -3.96132,2.60925 -7.46601,4.74409 -7.78821,4.74409 -0.32319,0 -0.58708,0.26686 -0.58708,0.59302 0,0.32615 -0.33407,0.59894 -0.74127,0.60619 -0.40819,0.007 -1.4084,0.53503 -2.22379,1.17283 -0.81539,0.63781 -1.74938,1.16511 -2.07553,1.17178 -0.32617,0.007 -1.38666,-1.25496 -2.35723,-2.80362 -2.21588,-3.53534 -5.30942,-7.65963 -7.34543,-9.79234 -1.70491,-1.78626 -9.18574,-7.55217 -9.79754,-7.55217 -0.20853,0 -1.51019,-0.49886 -2.8929,-1.10856 -1.3827,-0.60971 -3.69349,-1.46825 -5.13648,-1.90788 -3.4187,-1.04185 -16.70018,-1.06597 -19.91133,-0.0361 -9.23418,2.96167 -14.91226,8.29013 -18.60474,17.46101 -0.36767,0.91228 -0.66516,4.24797 -0.6622,7.41265 0.01,9.25834 2.07653,14.32774 8.26658,20.28272 2.20402,2.12002 4.77967,4.3155 5.72453,4.87883 2.27914,1.35911 17.12814,8.78718 20.11692,10.06295 1.29573,0.55328 5.55849,2.36689 9.47237,4.03022 20.61109,8.75945 33.48043,15.21128 43.88283,21.9994 1.95694,1.27705 3.94649,2.50419 4.4209,2.72694 1.02295,0.47964 1.14649,0.57694 8.10547,6.34373 6.45988,5.35334 15.64166,15.59614 15.64166,17.44904 0,0.30799 0.35976,0.8587 0.79959,1.22382 0.43981,0.36512 1.67031,2.46593 2.73377,4.66845 1.06446,2.20252 2.27816,4.67174 2.69919,5.48712 0.42005,0.81539 1.44398,3.75081 2.27421,6.52313 4.37245,14.59485 5.02378,30.4122 1.9253,46.74634 -1.64462,8.67033 -6.15249,18.90082 -11.74755,26.6618 -3.80417,5.27607 -10.97071,12.75755 -14.69581,15.34129 -1.14154,0.79177 -3.40981,2.37686 -5.0406,3.52241 -4.21136,2.95849 -15.0773,8.16513 -21.3484,10.22964 -6.83643,2.25066 -12.93555,3.6123 -23.12743,5.16308 -4.12241,0.6272 -31.24874,0.76088 -35.58068,0.17534 z")
    .attr({ fillColor: 'black', scale: 0.55, x: -30, y: -240 })
    .addTo(overlay)
  ;

  var clip = new Path("m 292,1057 c -1,0 -2,-0 -3,-0 C 286,1056 2,946 2,622 V 385 c 0,-5 4,-10 10,-10 H 571 c 5,0 10,4 10,10 v 236 c 0,324 -283,433 -286,434 -1,0 -2,0 -3,0 z")
    .attr({ scale: 0.44, y: -41, x: 120, origin: { x: 0, y: 0 } })
  ;
  mainMovie.attr({ clip: clip });
};

const isInBonsaiEnvironment = typeof stage !== 'undefined';
if (isInBonsaiEnvironment) theMovie();

const isSamePosition = (pos1, pos2) => pos1.x === pos2.x && pos1.y === pos2.y;
const colorForPosition = (config, pos) => {
  const configs = Object.values(config);
  const found = configs.filter(config => isSamePosition(config.position, pos));
  return found.length === 1 ? found[0].color : null;
}
const cloneDiamonds = (config, cloneDiamond, cloneDiamondWithColor) => {
  for (var x = 0; x < 11; x++) for (var y = 0; y < 6; y++) {
    const color = colorForPosition(config, {x, y});
    if (color) {
      cloneDiamondWithColor(x, y, color);
    } else {
      cloneDiamond(x, y);
    }
  }
}
const exportForTesting = () => {
  if (typeof module !== 'undefined') {
    module.exports = { cloneDiamonds };
  }
}
exportForTesting();
