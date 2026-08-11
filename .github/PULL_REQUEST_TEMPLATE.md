# Summary

<!-- What does this change, and why? The diff already says what; explain why. -->

## Related issues

<!-- e.g. Closes #12 -->

## Verification

CI runs all four on Node 20 and 22. Confirm you ran them locally:

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run build`

<!-- If you exercised the live Google/Gemini paths manually, say what you did.
     Those are not covered by automated tests. -->

## Cost impact

Discovery and generation are the two operations that spend money.

- [ ] This change does not increase the number of paid API calls
- [ ] It does, and the summary above explains why that is justified

## Checklist

- [ ] No secrets, API keys, or `.env` contents are included in this diff
- [ ] The copyright notices in `LICENSE` are untouched
- [ ] No verification gate was weakened to make this pass
- [ ] Docs updated if behaviour, setup, or environment variables changed
