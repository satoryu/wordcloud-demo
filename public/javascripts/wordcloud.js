// ワードリスト
var myWords = [
  { word: "China", size: "50", color: "#A4CABC" },
  { word: "India", size: "40", color: "#A4CABC" },
  { word: "Indonesia", size: "30", color: "#A4CABC" },
  { word: "Algeria", size: "40", color: "#EAB364" },
  { word: "Congo", size: "30", color: "#EAB364" },
  { word: "Sudan", size: "20", color: "#EAB364" },
  { word: "Russia", size: "60", color: "#DDA288" },
  { word: "Kazakhstan", size: "50", color: "#DDA288" },
  { word: "Ukraine", size: "40", color: "#DDA288" },
  { word: "Canada", size: "50", color: "#ACBD78" },
  { word: "America", size: "40", color: "#ACBD78" },
  { word: "Mexico", size: "30", color: "#ACBD78" },
  { word: "Brazil", size: "40", color: "#A5C3CF" },
  { word: "Columbia", size: "30", color: "#A5C3CF" },
  { word: "Argentina", size: "20", color: "#A5C3CF" },
];

$(function (){
  // グラフの表示設定
  var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 450 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  // svgオブジェクトの追加
  var svg = d3
    .select("#wordcloud")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const $form = $('form#keyword')
  const $input = $('input[name="keyword"]', $form)
  $form.submit(function(event) {
    event.preventDefault();

    const keyword = $input.val()

    fetch(`./words?keyword=${encodeURI(keyword)}`, {
      method: 'GET'
    }).then(function(response) {
      return response.json()
    }).then(function(words) {
      var layout = d3.layout
        .cloud()
        .size([width, height])
        .words(
          words.map(function (d) {
            return { text: d.word, size: d.size, color: d.color };
          })
        )
        .padding(5) //単語の距離
        .rotate(function () {
          return ~~(Math.random() * 2) * 90;
        })
        .fontSize(function (d) {
          return d.size;
        }) // フォントサイズ
        .on("end", draw);
      layout.start();

      // 'ayoutの出力を受け取り単語を描画
      function draw(words) {
        svg
          .append("g")
          .attr(
            "transform",
            "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")"
          )
          .selectAll("text")
          .data(words)
          .enter()
          .append("text")
          .style("font-size", function (d) {
            return d.size;
          })
          .attr("fill", function (d) {
            return d.color;
          })
          .attr("text-anchor", "middle")
          .style("font-family", "Impact")
          .attr("transform", function (d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function (d) {
            return d.text;
          });
      }
    })
  })
})