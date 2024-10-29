import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" passHref>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a página inicial
        </Button>
      </Link>
      
      <h1 className="text-4xl font-bold mb-8">Sobre Nós</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Nossa Missão</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Nossa missão é democratizar o acesso à educação de qualidade, oferecendo cursos online acessíveis e de alto nível para estudantes em todo o mundo.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nossa Visão</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Aspiramos ser a plataforma de educação online líder, reconhecida pela excelência de nossos cursos e pelo impacto positivo na vida de milhões de estudantes.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nossos Valores</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Excelência acadêmica</li>
              <li>Inovação constante</li>
              <li>Acessibilidade e inclusão</li>
              <li>Aprendizado centrado no aluno</li>
              <li>Ética e integridade</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nossa História</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Fundada em 2020, nossa plataforma nasceu da paixão por educação e tecnologia. Começamos com apenas 5 cursos e hoje oferecemos mais de 100 cursos em diversas áreas do conhecimento, atendendo estudantes de todo o Brasil e do mundo.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Entre em Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Estamos sempre abertos para ouvir sugestões, responder dúvidas ou discutir parcerias. Entre em contato conosco:</p>
            <p className="mt-2">
              Email: contato@cursoonline.com<br />
              Telefone: (11) 1234-5678
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}