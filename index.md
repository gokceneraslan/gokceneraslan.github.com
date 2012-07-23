---
layout: eppek
title: Home
---

### Son yazdığım [notlar](/notes/)
<ul class="inset">
{% for post in site.posts %}
  <li>
    <a href="{{ post.url }}"><strong>{{ post.date | date_to_string }}</strong></a>: {{ post.title }}
  </li>
{% endfor %}
</ul>

