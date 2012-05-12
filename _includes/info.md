{% capture stuff %}

#<a href="/" id="home">Gökçen Eraslan</a>

Boğaziçi Üniversitesi                                                           
Bilgisayar Mühendisliği                                                         
Yüksek Lisans Öğrencisi                                                         

[Polimer Araştırma Merkezi](http://www.prc.boun.edu.tr/PRC/)'nde proteinlerdeki
 wiggling ve jiggling atomları inceliyor.

<p class="no-bottom-margin"></p>
<ul>
<li><a href="http://blog.yeredusuncedernegi.com/feed/">rss</a></li>
<li><a href="&#109;&#097;&#105;&#108;&#116;&#111;:&#103;&#111;&#107;&#099;&#101;&#110;&#046;&#101;&#114;&#097;&#115;&#108;&#097;&#110;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;">email</a></li>
<li><a href="http://www.facebook.com/gokceneraslan">facebook</a> &#xb7;
  <a href="http://twitter.com/gokcen">twitter</a> &#xb7;
  <a href="https://plus.google.com/102886392023813390441">google+</a></li>
<li><a href="https://github.com/gokceneraslan">github</a></li>
</ul>

*{{ site.time | date_to_string }}*

![santralben](/images/pic3.png)

{% endcapture %}
{{ stuff | markdownify }}
