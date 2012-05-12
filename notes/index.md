---
layout: default
title: Blog
---
Bir takım notlarım:

{% for post in site.posts %}
{{ post.date | date_to_string }}
: [{{ post.title }}]({{ post.url }})  
  {{ post.summary }}
{% endfor %}
