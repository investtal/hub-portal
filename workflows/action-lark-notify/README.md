# Lark Notify - GitHub Action

A GitHub action to send notifications to Lark.

## Usage

You can use this action after any other action. Here is an example setup of this action:

1. Create a .github/workflows/lark-notify.yml file in your GitHub repo.
2. Add the following code to the lark-notify.yml file.

```yaml
on: push
name: Lark Notification Demo
jobs:
  larkNotification:
    name: Lark Notification
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Lark Notification
        uses: investtal/action-lark-notify@v1
        env:
          LARK_WEBHOOK: ${{ secrets.LARK_WEBHOOK }}
```



```yaml
- name: Notify Lark
  uses: investtal/action-lark-notify@v1
  with:
    lark_webhook: ${{ secrets.LARK_WEBHOOK }}
    lark_message_title: ${{ secrets.LARK_MESSAGE_TITLE }}
    lark_message_subtitle: ${{ secrets.LARK_MESSAGE_SUBTITLE }}
    lark_message_icon_img_key: ${{ secrets.LARK_MESSAGE_ICON_IMG_KEY }}
    lark_message_template: ${{ secrets.LARK_MESSAGE_TEMPLATE }}
```

## Credits

- [https://github.com/drayeasy/action-lark-notify](https://github.com/drayeasy/action-lark-notify)

## License

MIT
