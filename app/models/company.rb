class Company
  # ==================================================
    #                      SET UP
    # ==================================================

    # add attribute readers for instance access
    attr_reader :id, :company_name, :industry, :staff, :rating, :mission_statement

    # connect to postgres
    DB = PG.connect(host: "localhost", port: 5432, dbname: 'react_contacts')

    # initialize options hash
    def initialize(opts = {})
        @id = opts["id"].to_i
        @company_name = opts["company_name"]
        @industry = opts["industry"]
        @rating = opts["rating"].to_i
        @mission_statement = opts["mission_statement"]
        if opts["staff"]
          @staff = opts["staff"]
        end
    end

    # ==================================================
    #                      ROUTES
    # ==================================================

    # get all
    def self.all
      results = DB.exec(
          <<-SQL
              SELECT
                companies.*,
                people.id AS person_id,
                people.name,
                people.age,
                people.phone,
                people.avatar,
                people.key_skill
              FROM companies
              LEFT JOIN people
              ON companies.id = people.company_id
          SQL
      )
      companies = []
      current_company_id = nil
      results.each do |result|
          if result["id"] != current_company_id
              current_company_id = result["id"]
              companies.push(
                  Company.new({
                      "id" => result["id"],
                      "company_name" => result["company_name"],
                      "industry" => result["industry"],
                      "rating" => result["rating"],
                      "mission_statement" => result["mission_statement"],
                      "staff" => []
                  })
              )
          end
          if result["person_id"]
            p result
              new_person = Person.new(
                {
                  "id" => result["person_id"],
                  "name" => result["name"],
                  "age" => result["age"],
                  "phone" => result["phone"],
                  "avatar" => result["avatar"],
                  "key_skill" => result["key_skill"],
                }
            )
              companies.last.staff.push(new_person)
          end
      end
      return companies
    end

    # get one by id
    def self.find(id)
        results = DB.exec(
            <<-SQL
                SELECT
                    companies.*,
                    people.id AS person_id,
                    people.name,
                    people.age,
                    people.phone,
                    people.avatar,
                    people.degree,
                    people.key_skill
                FROM companies
                LEFT JOIN people
                ON companies.id = people.company_id
                WHERE companies.id=#{id};
            SQL
        )
        staff = []
        results.each do |result|
            if result["person_id"]
                staff.push Person.new(
                  {
                    "id" => result["id"],
                    "name" => result["name"],
                    "age" => result["age"],
                    "phone" => result["phone"],
                    "avatar" => result["avatar"],
                    "degree" => result["degree"],
                    "key_skill" => result["key_skill"],
                  }
              )
            end
        end
        return Company.new({
            "id" => results.first["id"],
            "company_name" => results.first["company_name"],
            "industry" => results.first["industry"],
            "mission_statement" => results.first["mission_statement"],
            "staff" => staff
        })
    end

    # create one
    def self.create(opts={})
        results = DB.exec(
            <<-SQL
                INSERT INTO companies (company_name, industry, rating, mission_statement)
                VALUES ( '#{opts["company_name"]}', '#{opts["industry"]}','#{opts["rating"]}','#{opts["mission_statement"]}' )
                RETURNING id, company_name, industry, rating, mission_statement;
            SQL
        )
        return Company.new(results.first)
    end

    # delete one by id
    def self.delete(id)
        results = DB.exec("DELETE FROM companies WHERE id=#{id};")
        return { deleted: true }
    end

    # update one by id
    def self.update(id, opts={})
        results = DB.exec(
            <<-SQL
                UPDATE companies
                SET company_name='#{opts["company_name"]}', industry='#{opts["industry"]}', rating='#{opts["rating"]}',mission_statement='#{opts["mission_statement"]}'
                WHERE id=#{id}
                RETURNING id, company_name, industry, rating, mission_statement;
            SQL
        )
        return Company.new(results.first)
    end

end
