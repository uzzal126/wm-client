export default function VariantTable({ variant }: { variant: any }) {
  if (!variant?.variants?.option3 && !variant?.variants?.option2) {
    return <></>;
  }
  // console.log("variant", variant);
  return (
    <table>
      <tbody>
        {variant?.variants?.option1 && variant?.variants?.value1 ? (
          <tr>
            <td>{variant?.variants?.option1}:</td>
            <td>{variant?.variants?.value1}</td>
          </tr>
        ) : (
          ""
        )}
        {variant?.variants?.option2 && variant?.variants?.value2 ? (
          <tr>
            <td>{variant?.variants?.option2}:</td>
            <td>{variant?.variants?.value2}</td>
          </tr>
        ) : (
          ""
        )}
        {variant?.variants?.option3 && variant?.variants?.value3 ? (
          <tr>
            <td>{variant?.variants?.option3}:</td>
            <td>{variant?.variants?.value3}</td>
          </tr>
        ) : (
          ""
        )}
      </tbody>
    </table>
  );
}
