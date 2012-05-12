---
layout: default
title: Blog
---
Bir takım notlarım:

{% for post in site.categories.notes %}
{{ post.date | date_to_string }}
: [{{ post.title }}]({{ post.url }})  
  {{ post.summary }}
{% endfor %}
