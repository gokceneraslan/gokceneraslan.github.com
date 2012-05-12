---
layout: default
title: Home
---

### Son yazdığım [notlar](/notes/)
<ul class="inset">
{% for post in site.categories.notes %}
  <li>
    <a href="{{ post.url }}"><strong>{{ post.date | date_to_string }}</strong></a>: {{ post.title }}
  </li>
{% endfor %}
</ul>

