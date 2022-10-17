import {
  StyleSheet,
  Document,
  Text,
  Page,
  View,
  Link,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  brandText: {
    fontWeight: 700,
    fontSize: 80,
    fontFamily: "IvyMode",
    marginTop: -10,
  },
});

export default function Invoice({ invoice }}) {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          padding: 50,
          backgroundColor: "#efefef",
          color: "#222222",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.brandText}>DKM</Text>
            {/*<Text style={styles.brandText}>Kye Miller</Text>*/}
          </View>
        </View>
        <View style={{ paddingBottom: 10, fontWeight: 600, fontSize: 15 }}>
          <Text>Dalton Kye Miller</Text>
          <Text style={{ padding: "3 0" }}>9447 Celine Dr.</Text>
          <Text>San Antonio, TX 78250</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              ...styles.brandText,
              fontWeight: 500,
              padding: "20 0",
              fontSize: 60,
            }}
          >
            Invoice
          </Text>
          <View style={{ fontSize: 15, fontFamily: "Helvetica" }}>
            <Text>
              <Text
                style={{
                  fontFamily: "Helvetica-Bold",
                }}
              >
                Invoice Number:
              </Text>{" "}
              {`${invoice.companyName
                .split(" ")
                .map((w) => w[0])
                .join("")
                .toUpperCase()}-${invoice.number}`}
            </Text>

            <Text style={{ fontFamily: "Helvetica-Bold", padding: "3 0" }}>
              Date:{" "}
              <Text style={{ fontFamily: "Helvetica" }}>Date Placeholder</Text>
            </Text>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>
              Due Date:
              <Text style={{ fontFamily: "Helvetica" }}>
                Due Date Placeholder
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ padding: "10 0" }}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>Bill To:</Text>
          <Text>{invoice?.companyName || "A Company Somewhere"}</Text>
          <Text style={{ padding: "3 0" }}>
            {invoice?.companyAddress || "1234 Test Dr."}
          </Text>
          <Text>{invoice?.companyCity || "Anytown, USA"}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottom: "2 solid #222222",
            fontWeight: 700,
            fontFamily: "Helvetica-Bold",
            padding: "10 0",
          }}
        >
          <Text>Services</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>Hrs</Text>
            <Text style={{ padding: "0 10" }}>Rate</Text>
            <Text>Total</Text>
          </View>
        </View>
        {invoice.services?.map((service, i) => (
          <View
            key={i}
            style={{
              flexDirection: "row",
              padding: "20 0",
              justifyContent: "space-between",
              borderBottom: "2 solid #222222",
            }}
          >
            <Text>{service?.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ paddingLeft: -3 }}>{service?.hrs}</Text>
              <Text style={{ padding: "0 10" }}>${service?.rate}</Text>
              <Text>${service?.hrs * service?.rate}</Text>
            </View>
          </View>
        ))}
        <View style={{ margin: "auto 0" }}>
          <Text style={{ fontFamily: "Helvetica-Bold", marginBottom: "5" }}>
            Notes:
          </Text>
          <Text style={{ fontFamily: "Helvetica" }}>
            {invoice?.notes || "Thank you!"}
          </Text>
        </View>
        <View
          style={{
            marginTop: "auto",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>
              Preferred Payment:
            </Text>
            <Text style={{ fontFamily: "Helvetica" }}>
              <Link src="https://paypal.me/daltonkmiller">
                <Text>paypal.me/daltonkmiller</Text>
              </Link>
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", fontSize: 25, alignItems: "center" }}
          >
            <Text style={{ fontFamily: "Helvetica-Bold" }}>Total:</Text>
            <Text style={{ fontFamily: "Helvetica", padding: "0 10" }}>
              ${invoice.services.reduce((a, c) => a + c.hrs * c.rate, 0)}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
