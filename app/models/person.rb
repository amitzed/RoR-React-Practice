class Person 
  # ==================================================
    #                      SET UP
    # ==================================================

    # add attribute readers for instance access
    attr_reader :id, :name, :age, :company, :avatar, :degree, :key_skill, :phone

    # connect to postgres
    DB = PG.connect(host: "localhost", port: 5432, dbname: 'react_contacts')

    # initialize options hash
    def initialize(opts = {})
        @id = opts["id"].to_i
        @name = opts["name"]
        @phone = opts["phone"]
        @avatar = opts["avatar"]
        @degree = opts["degree"]
        @key_skill = opts["key_skill"]
        @age = opts["age"].to_i
        #if company is in opts hash, show it
        if opts["company"]
          @company_id = opts["company"]
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
                  people.*,
                  companies.company_name,
                  companies.industry,
                  companies.mission_statement
              FROM people
              LEFT JOIN companies
                  ON people.company_id = companies.id
          SQL
      )
      return results.map do |result|
            if result["company_id"]
                company = Company.new(
                    {
                        "id" => result["company_id"],
                        "company_name" => result["company_name"],
                        "industry" => result["industry"],
                        "mission_statement" => result["mission_statement"]
                    }
                )
            else
                company = nil
            end
            Person.new(
                {
                    "id" => result["id"],
                    "name" => result["name"],
                    "age" => result["age"],
                    "company" => company,
                    "phone" => result["phone"],
                    "avatar" => result["avatar"],
                    "degree" => result["degree"],
                    "key_skill" => result["key_skill"],
                }
            )
        end
    end

    # get one by id
    def self.find(id)
        results = DB.exec(
            <<-SQL
                SELECT
                    people.*,
                    companies.company_name,
                    companies.industry,
                    companies.mission_statement
                FROM people
                LEFT JOIN companies
                    ON people.company_id = companies.id
                WHERE people.id=#{id};
            SQL
        )
        result = results.first
        if result["company_id"]
            company = Company.new(
                {
                    "id" => result["company_id"],
                    "company_name" => result["company_name"],
                    "industry" => result["industry"],
                    "mission_statement" => result["mission_statement"]
                }
            )
        else
            company = nil
        end
        person =  Person.new(
            {
              "id" => result["id"],
              "name" => result["name"],
              "age" => result["age"],
              "company" => company,
              "phone" => result["phone"],
              "avatar" => result["avatar"],
              "degree" => result["degree"],
              "key_skill" => result["key_skill"],
            }
        )
        return person
    end

    # create one
    def self.create(opts={})
      results = DB.exec(
          <<-SQL
              INSERT INTO people (name, age, phone, avatar, degree, key_skill, company_id)
              VALUES (
                '#{opts["name"]}',
                 #{opts["age"]},
                 '#{opts["phone"]}',
                 '#{opts["avatar"]}',
                 '#{opts["degree"]}',
                 '#{opts["key_skill"]}',
                #{opts["company_id"] ? opts["company_id"] : "NULL"} )
              RETURNING id, name, age, phone, avatar, degree, key_skill, company_id;
          SQL
      )
      return Person.new(results.first)
    end

    # delete one (by id)
    def self.delete(id)
      results = DB.exec("DELETE FROM people WHERE id=#{id};")
      return { deleted: true }
    end

    # update one (by id)
    def self.update(id, opts={})
      results = DB.exec(
          <<-SQL
              UPDATE people
              SET
               name='#{opts["name"]}',
               age=#{opts["age"]},
               phone='#{opts["phone"]}',
               avatar='#{opts["avatar"]}',
               degree='#{opts["degree"]}',
               key_skill='#{opts["key_skill"]}',
               company_id=#{opts["company_id"] ? opts["company_id"] : "NULL"}
              WHERE id=#{id}
              RETURNING id, name, age, phone, avatar, degree, key_skill, company_id;
          SQL
      )
      return Person.new(results.first)
    end

    # update company person belongs to
    def self.setCompany(person_id, company)
    results = DB.exec(
        <<-SQL
            UPDATE people
            SET company_id = #{company.id}
            WHERE id = #{person_id}
            RETURNING id, name, age;
        SQL
    )
    return Person.new(results.first)
  end

end
