

```html
 <p class="input-link" placeholder="必填" ></p>
```
```scss
.input-link{
  &:empty{
    &::before{
      content: attr(placeholder);
    }
  }
}
```