package kr.go.guri.login.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;

/**
 * 로그인화면 Mapper 클래스
 * @author 김부권
 * @since 2021. 10. 07.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2021.10.07.   	김부권          최초 생성
 *   
 * </pre>
 */
@Repository("loginMapper")
public class LoginMapper extends ComAbstractDAO {

	/**
	 * sso 테이블 유저 ID검색
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public List<Map<String, Object>> selectSearchInfo(Map<String, Object> param) throws IOException, SQLException {
		return selectList("LoginMapper.selectSearchInfo", param);
	}
	
	/**
	 *  유저 테이블에서 logon_id 중복 체크
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public int selectCheckUserInfo(Map<String, Object> param) throws IOException, SQLException {
		return (Integer) selectOne("LoginMapper.selectCheckUserInfo", param);
	}
	
	/**
	 *  유저 등록
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public int insertUserInfo(Map<String, Object> param) throws IOException, SQLException {
		return insert("LoginMapper.insertUserInfo", param);
	}

	/**
	 * 유저 로그인
	 * @param param
	 * @return
	 * @throws IOException, SQLException
	 */
	public Map<String, Object> selectUserLogin(Map<String, Object> param) throws IOException, SQLException {
		return selectOne("LoginMapper.selectUserLogin", param);
	}
	
}
