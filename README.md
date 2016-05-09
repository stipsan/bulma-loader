# Bulma Loader

A Webpack loader for Bulma, a modern CSS framework based on Flexbox

[![NPM](https://nodei.co/npm/bulma-loader.png)](https://www.npmjs.com/package/bulma-loader)

# When should I use this?

If you want to customize Bulma while using it in CSS modules this loader is for you.

For everyone else who just want to customize Bulma in their project or isn't familiar with CSS modules yet follow step 3 in the official docs: http://bulma.io/documentation/overview/start/

# Usage

1. Create a sass file for your Bulma variables.
2. Add the bulmaLoader after the sass loader.
3. Configure the loader with the location of your variables file.

# Examples

Assuming you put your variables here: `./sass/bulma.sass`

## Configure by query

```javascript
{
  test: /\.scss$/,
  loaders: ["style", "css?modules&importLoaders=2", "sass", "bulma?theme=sass/bulma.sass"]
}
```

## Configure by loader options

Inside your webpack config object:
```javascript
{
  [ ... ]
  bulmaLoader: {
    theme: 'sass/bulma.sass'
  },
  plugins: [
    {
      test: /\.scss$/,
      loaders: ["style", "css?modules&importLoaders=2", "sass", "bulma"]
    }
  ]
}
```

## Importing customized Bulma CSS

Assuming your style codebase is already split into modules and local by default:

`./src/components/Welcome/style.scss`
```css

.hero {
  composes: hero is-fullheight is-success is-bold from 'bulma';
}
.hero-content {
  composes: hero-content from 'bulma';
  opacity: .9;
}

.title {
  composes: title is-3 from 'bulma';
}
.subtitle {
  composes: subtitle is-5 from 'bulma';
}

```

`./src/components/Welcome/index.jsx`
```javascript
import style from './style.scss'

export const Welcome = () => <div className={style.hero}>
  <div className={style['hero-content']}>
    <h1 className={style.title}>Welcome!</h1>
    <h2 className={style.subtitle}>Long time no see :-)</h2>
  </div>
</div>
```

Importing from 'bulma' will map to ./node_modules/bulma/bulma.sass.
You can import from any sass file in bulma by doing this:
```css
.call-to-action {
  composes: button is-primary is-large from 'bulma/sass/elements/button.sass'
}
```

You can also import from the CSS file directly like this (and it works without bulma-loader):
```css
.call-to-action {
  composes: button is-primary is-large from 'bulma/css/bulma.css'
}
```