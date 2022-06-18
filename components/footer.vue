<template>
  <div class="footer">
    本サイトは川崎市のオープンデータを元に作成しています。<br>
    お問い合わせは kawasakirub@gmail.com まで<br>
    開発中のものであり、予告なく停止（メンテナンス）する可能性があります。
  </div>
</template>

<script>
</script>

<style>
.footer {
  color: #fff;
  padding: 5px;
  background-color: #222222;
  font-size: 13px;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}

  /* レスポンシブ対応 */
  @media screen and (max-width:520px) {
    /* フォント調整 */
	  .footer{
		  font-size: 10px;
	  }

  }

</style>