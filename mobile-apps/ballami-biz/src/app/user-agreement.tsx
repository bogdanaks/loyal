import { Stack } from "expo-router"
import React from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { theme } from "shared/config/theme"

export default function UserAgreement() {
  const { bottom } = useSafeAreaInsets()

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
      }}
    >
      <Stack.Screen
        options={{
          title: "Пользовательское соглашение",
          headerTitleStyle: { color: theme.accentForeground },
          headerBackTitleVisible: false,
          headerBackVisible: true,
        }}
      />
      <ScrollView>
        <View style={{ marginTop: 16, marginBottom: bottom }}>
          <Text>
            Настоящее Пользовательское Соглашение (Далее Соглашение) регулирует отношения между
            владельцем &quot;Баллами Бизнес&quot; (далее Баллами или Администрация) с одной стороны
            и пользователем приложения с другой. Приложение Баллами не является средством массовой
            информации.
          </Text>
          <View style={styles.paragraph}>
            <Text>Используя приложение, Вы соглашаетесь с условиями данного соглашения.</Text>
            <Text style={{ fontWeight: "500" }}>
              Если Вы не согласны с условиями данного соглашения, не используйте приложение Баллами!
            </Text>
          </View>
          <View>
            <View style={styles.bigBlock}>
              <Text style={styles.title}>Права и обязанности сторон</Text>
              <View style={styles.block}>
                <Text style={styles.bold}>Пользователь имеет право:</Text>
                <Text>- осуществлять поиск информации в приложении</Text>
                <Text>- получать информацию в приложении</Text>
                <Text>- использовать информацию приложения в личных некоммерческих целях</Text>
                <Text>
                  - использовать информацию приложения в коммерческих целях с разрешения
                  Администрации
                </Text>
              </View>
              <View style={styles.block}>
                <Text style={styles.bold}>Администрация имеет право:</Text>
                <Text>
                  - по своему усмотрению и необходимости создавать, изменять, отменять правила
                </Text>
                <Text>- ограничивать доступ к любой информации в приложении</Text>
                <Text>- создавать, изменять, удалять информацию</Text>
              </View>
              <View style={styles.block}>
                <Text style={styles.bold}>Пользователь обязуется:</Text>
                <Text>- обеспечить достоверность предоставляемой информации</Text>
                <Text>- обеспечивать сохранность личных данных от доступа третьих лиц</Text>
                <Text>
                  - не распространять информацию, которая направлена на пропаганду войны, разжигание
                  национальной, расовой или религиозной ненависти и вражды, а также иной информации,
                  за распространение которой предусмотрена уголовная или административная
                  ответственность
                </Text>
                <Text>- не нарушать работоспособность Приложения</Text>
                <Text>
                  - не создавать несколько учётных записей в приложении, если фактически они
                  принадлежат одному и тому же лицу
                </Text>
                <Text>
                  - не совершать действия, направленные на введение других Пользователей в
                  заблуждение
                </Text>
                <Text>
                  - не регистрировать учетную запись от имени или вместо другого лица за исключением
                  случаев, предусмотренных законодательством РФ
                </Text>
                <Text>
                  - не размещать материалы рекламного, эротического, порнографического или
                  оскорбительного характера, а также иную информацию, размещение которой запрещено
                  или противоречит нормам действующего законодательства РФ
                </Text>
                <Text>
                  - не использовать скрипты (программы) для автоматизированного сбора информации
                  и/или взаимодействия в Приложении и его Сервисами
                </Text>
              </View>
              <View style={styles.block}>
                <Text style={styles.bold}>Администрация обязуется:</Text>
                <Text>
                  - поддерживать работоспособность приложения за исключением случаев, когда это
                  невозможно по независящим от Администрации причинам.
                </Text>
              </View>
            </View>
            <View style={styles.bigBlock}>
              <Text style={styles.title}>Ответственность сторон</Text>
              <Text>
                - администрация не несёт ответственность за несовпадение ожидаемых Пользователем и
                реально полученных услуг
              </Text>
              <Text>
                - администрация не несет никакой ответственности за услуги, предоставляемые третьими
                лицами
              </Text>
              <Text>
                - в случае возникновения форс-мажорной ситуации (боевые действия, чрезвычайное
                положение, стихийное бедствие и т. д.) Администрация не гарантирует сохранность
                информации, размещённой Пользователем, а также бесперебойную работу информационного
                ресурса
              </Text>
            </View>
            <View style={styles.bigBlock}>
              <Text style={styles.title}>Условия действия Соглашения</Text>
              <Text>
                Данное Соглашение вступает в силу при любом использовании данного приложения.
              </Text>
              <Text>Соглашение перестает действовать при появлении его новой версии.</Text>
              <Text>
                Администрация оставляет за собой право в одностороннем порядке изменять данное
                соглашение по своему усмотрению.
              </Text>
              <Text>Администрация не оповещает пользователей об изменении в Соглашении.</Text>
            </View>
            <Text>Дата публикации: 2024-03-19</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  paragraph: {
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
  },
  bold: {
    fontWeight: "500",
  },
  bigBlock: {
    marginVertical: 16,
  },
  block: {
    marginVertical: 8,
  },
})