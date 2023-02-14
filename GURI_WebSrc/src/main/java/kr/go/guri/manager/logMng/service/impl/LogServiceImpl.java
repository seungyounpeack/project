package kr.go.guri.manager.logMng.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.guri.manager.logMng.service.LogService;

/**
 * @Description		: 로그 관리 ServiceImpl
 * @Source        	: LogServiceImpl.java
 * @author 권기완
 * @since 2022. 06. 25.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2022.06.25.   	김부권          최초 생성
 *   
 * </pre>
 */
@Service("logService")
public class LogServiceImpl implements LogService {

	@Resource(name = "logMapper")
	private LogMapper logMapper;

	/**
	 * 사용자 로그 insert
	 * @param param
	 * @return
	 * @throws SQLException , IOException
	 */
	@Override
	public int createUserLog(Map<String, Object> param) throws SQLException , IOException {
		
		return logMapper.createUserLog(param);
	}


	/**
	 * 메뉴 로그 insert
	 * @param param
	 * @return
	 * @throws SQLException , IOException
	 */
	@Override
	public int createMenuLog(Map<String, Object> param) throws SQLException , IOException {
		
		return logMapper.createMenuLog(param);
	}

	/**
	 * 로그 관리 날짜
	 * @param param
	 * @return
	 * @throws SQLException , IOException 
	 */
	@Override
	public Map<String, Object> selectLogDate() throws SQLException , IOException {
		// TODO Auto-generated method stub
		return logMapper.selectLogDate();
	}

	/**
	 * 누적 방문자수 통계
	 * @param param
	 * @return
	 * @throws SQLException , IOException 
	 */
	@Override
	public Map<String, Object> selectLogTotalVisitor() throws SQLException , IOException {
		// TODO Auto-generated method stub
		return logMapper.selectLogTotalVisitor();
	}

	/**
	 * 누적 방문횟수 통계
	 */
	@Override
	public Map<String, Object> selectLogTotalCnt() throws SQLException , IOException {
		// TODO Auto-generated method stub
		return logMapper.selectLogTotalCnt();
	}

	/**
	 * 누적 페이지뷰 통계 
	 */
	@Override
	public Map<String, Object> selectLogTotalView() throws SQLException , IOException {
		// TODO Auto-generated method stub
		return logMapper.selectLogTotalView();
	}

	/**
	 * 사용자 유저(월별) 로그 CNT
	 */
	@Override
	public List<Map<String, Object>> selectLogUserMonthCnt(Map<String, Object> param) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return logMapper.selectLogUserMonthCnt(param);
	}

	/**
	 * 사용자 유저 로그(요일별) cnt 조회
	 */
	@Override
	public List<Map<String, Object>> selectLogUserDayCnt(Map<String, Object> param) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return logMapper.selectLogUserDayCnt(param);
	}

	/**
	 * 사용자 유저 로그(페이지 방문 현황) 데이터 조회 
	 */
	@Override
	public List<Map<String, Object>> selectLogUserPageView(Map<String, Object> param) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return logMapper.selectLogUserPageView(param);
	}


	@Override
	public List<Map<String, Object>> selectLogDetailView(Map<String, Object> param) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return logMapper.selectLogDetailView(param);
	}


}
