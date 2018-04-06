<template>
<div class="columns">
  <div class="column">
    <article class="message is-danger has-text-left">
      <div class="message-header">
        <slot name="header"></slot>
      </div>
      <div class="message-body">
        <slot>(error_message)</slot>
      </div>
    </article>
  </div>
</div>
</template>
